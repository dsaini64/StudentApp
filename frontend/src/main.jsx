import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

function MainApp(){
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '' });

  const fetchStudents = () => {
    axios.get('http://localhost:8000/students/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  useEffect(() =>{
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditedData(student);
  };

  const handleSave = () => {
    axios.patch(`http://localhost:8000/students/${editingId}`, {name: editedData.name, age: editedData.age, grade: editedData.grade})
      .then(() => {
        fetchStudents();
        setEditingId(null);
        setEditedData({});
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  };

  const handleChange = (field, value) => {
    setEditedData({...editedData, [field]: value});
  };

  const handleDelete = (student) => {
    axios.delete(`http://localhost:8000/students/${student.id}`)
      .then(() => {
        setData(data.filter(row => row.id !== student.id));
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  const handleAddStudent = () => {
    setShowAddForm(true);
  };

  const handleNewStudentChange = (field, value) => {
    setNewStudent({...newStudent, [field]: value});
  };

  const handleSubmitNewStudent = (e) => {
    e.preventDefault();
    const studentData = {
      name: newStudent.name,
      age: newStudent.age ? parseInt(newStudent.age) : null,
      grade: newStudent.grade
    };

    axios.post('http://localhost:8000/students', studentData)
      .then(() => {
        fetchStudents();
        setNewStudent({ name: '', age: '', grade: '' });
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error adding student:', error);
        alert('Error adding student. Please check the console for details.');
      });
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewStudent({ name: '', age: '', grade: '' });
  };

  const columns = [{ header: 'ID', accessor: 'id' }, { header: 'Name', accessor: 'name' }, { header: 'Age', accessor: 'age' },  { header: 'Grade', accessor: 'grade' }, { header: 'Edit', accessor: 'edit' }, { header: 'Delete', accessor: 'delete' }];
  return(
    <div className="table-wrapper">
      <CustomTable data={data} columns={columns} onEdit={handleEdit} editingId={editingId} editedData={editedData} onSave={handleSave} onChange={handleChange} onDelete={handleDelete}/>
      <div className="add-student-container">
        <button onClick={handleAddStudent} disabled={showAddForm}>Add Student</button>
      </div>
      {showAddForm && (
        <div className="add-student-form">
          <h3>Add New Student</h3>
          <form onSubmit={handleSubmitNewStudent}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newStudent.name}
                onChange={(e) => handleNewStudentChange('name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                value={newStudent.age}
                onChange={(e) => handleNewStudentChange('age', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                id="grade"
                value={newStudent.grade}
                onChange={(e) => handleNewStudentChange('grade', e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancelAdd}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

}


const CustomTable = ({ data, columns, onEdit, editingId, editedData, onSave, onChange, onDelete }) => {
  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.accessor === 'edit' ? (
                    row.id === editingId ? (
                      <button onClick={onSave}>Save</button>
                    ) : (
                      <button onClick={() => onEdit(row)} disabled={editingId !== null}>Edit</button>
                    )
                  ) : column.accessor === 'delete' ? (
                    <button onClick={() => onDelete(row)}>X</button>
                  ) : (
                    row.id === editingId && column.accessor !== 'id' ? (
                      <input
                        type="text"
                        value={editedData[column.accessor] || ''}
                        onChange={(e) => onChange(column.accessor, e.target.value)}
                      />
                    ) : (
                      row[column.accessor]
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}




createRoot(document.getElementById('head')).render(
  <MainApp/>
);
