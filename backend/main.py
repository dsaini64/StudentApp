from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select


class StudentBase(SQLModel):
    name: str = Field(index=True)
    age:int | None = Field(default=None, index=True)
    grade: str

class Student(StudentBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    
    
class StudentPublic(StudentBase):
    id: int
    
class StudentUpdate(StudentBase):
    name: str | None = None
    age: int | None = None
    grade: str | None = None

    
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
    
connect_args = {"check_same_thread" : False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    
def get_session():
    with Session(engine) as session:
        yield session
    
SessionDep = Annotated[Session, Depends(get_session)]
app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    
@app.post("/students")
def create_student(student: StudentBase, session: SessionDep) -> Student:
    db_student = Student.model_validate(student)
    session.add(db_student)
    session.commit()
    session.refresh(db_student)
    return db_student
    
@app.get("/students", response_model=list[StudentPublic])
def read_students(session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100) -> list[Student]:
    students = session.exec(select(Student).offset(offset).limit(limit)).all()
    return students
    
@app.get("/students/{student_id}")
def read_student(student_id: int, session: SessionDep) -> Student:
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@app.delete("/students/{student_id}")
def delete_student(student_id: int, session: SessionDep):
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    session.delete(student)
    session.commit()
    return {"Student deleted sucessfully", True}
    
@app.patch("/students/{student_id}", response_model=StudentPublic)
def update_student(student_id: int, student: StudentUpdate, session: SessionDep):
    db_student = session.get(Student, student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    student_data = student.model_dump(exclude_unset=True)
    db_student.sqlmodel_update(student_data)
    session.add(db_student)
    session.commit()
    session.refresh(db_student)
    return db_student
    

    
