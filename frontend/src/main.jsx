import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Car from './Vehicle.jsx'
import './index.css'

const myelement = (
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr>
      <td>John</td>
    </tr>
    <tr>
      <td>Elsa</td>
    </tr>
  </table>
);

let x = [2000, 2008]
const secondCar = {
  color: "white",
  model: "Mustang",
  brand: "Ford", 
  year: x[1]
}


function MainApp(){
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() =>{
    axios.get('http://localhost:8000/students/').then(response => {setData(response.data);}).catch(error => { console.error('Error fetching data: ', error);});

  }, []);

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditedData(student);
  };

  const handleSave = () => {
    axios.patch(`http://localhost:8000/students/${editingId}`, {name: editedData.name, age: editedData.age, grade: editedData.grade})
    setData(data.map(row => row.id === editingId ? editedData : row));
    setEditingId(null);
    setEditedData({});
  };

  const handleChange = (field, value) => {
    setEditedData({...editedData, [field]: value});
  };

  const columns = [{ header: 'ID', accessor: 'id' }, { header: 'Name', accessor: 'name' }, { header: 'Age', accessor: 'age' },  { header: 'Grade', accessor: 'grade' }, { header: 'Edit', accessor: 'edit' }];
  return(
    // <div>
    //   <h1>React app</h1>
    //   <p>{message}</p>

    // </div>

    <CustomTable data={data} columns={columns} onEdit={handleEdit} editingId={editingId} editedData={editedData} onSave={handleSave} onChange={handleChange}/>

  );

}


// const SimpleTable = ({ data, columns }) => {
//   return (
//     <table className = "styled-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column.header}>{column.header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column, colIndex) => (
//               <td key={colIndex}>{row[column.accessor]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };


const CustomTable = ({ data, columns, onEdit, editingId, editedData, onSave, onChange }) => {
  return (
    <div className="table-container">
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
    </div>
  );
}



function Son(props){
  return (
    <div style={{background: 'lightgreen'}}>
      <h2>Son</h2>
      <div>{props.children}</div>
    </div>
  );
}

function Daughter(props){
  const {brand, model} = props;
  return (
    <div style={{background: 'lightblue'}}>
      <h2>Daughter</h2>
      <div>{props.children}</div>
    </div>
  );
}

function Intro(){
  const x = "myclass";
  const mystyles = {
    color: "red", 
    fontSize: "20px", 
    backgroundColor: "lightyellow"
  };
  const z = 5;
  return (
    <>
    <h1 className={x} style={mystyles}>Hello World!</h1>
    <Car color = "red" model="500" year={2000}/>
    <Car carinfo={secondCar}/>
    <Son>
      <p>
        This was written in the Intro component, 
        but displayed as a part of the Son component
      </p>
    </Son>
    <Daughter>
      <p>
        This was written in the Intro component,
        but displayed as a part of the Daughter component
      </p>
    </Daughter>
    <h2>{(z) < 10 ? "Banana" : "Apple"}</h2>
    <p>Amazing!</p>
    </>
  );
}

function Alert(){
  const myfunc = () => {
    alert('Hello World');
  };
  return (
    <button onClick={myfunc}>Click me</button>
  )
}

function Football() {
  const shoot = (a, b) => {
    alert(b.type);
  }

  return (
    <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
  )
}

function MissedGoal() {
  return <h1>MISSED!</h1>;
}

function MadeGoal() {
  return <h1>Goal!</h1>;
}

function Goal(props) {
  const isGoal = props.isGoal;
  return(
    <>
      { isGoal ? <MadeGoal/> : <MissedGoal/> }
    </>
  );
}

function MyCars() {
  const cars = [
    {id: 1001, brand: 'Ford'}, 
    {id: 1002, brand: 'BMW'}, 
    {id: 1003, brand: 'Audi'}
  ];
  return (
    <>
      <h1>My Cars:</h1>
      <ul>
        {cars.map((car) => <li key={car.id}>I am a { car.brand }</li>)}
      </ul>
    </>
  )
}

// function MyForm(){

//   const [inputs, setInputs] = useState({myCar: "Volvo", name: "", mytxt:""});
  
//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setInputs(values =>({...values, [name]: value}))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(inputs.name);
//   }
   
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Enter your name:
//         <input 
//           type="text" 
//           name="name"
//           value={inputs.name || ""} 
//           onChange={handleChange}
//         /> 
//       </label>
//       <br/> <br/>
//        <label>Write here:
//           <textarea
//             name = "mytxt"
//             value = {inputs.mytxt || ""}
//             onChange={handleChange}
//           />
//       </label>
//       <input type="submit"/>
//       <select name="myCar" value={inputs.myCar} onChange={handleChange}>
//         <option value="Ford">Ford</option>
//         <option value="Volvo">Volvo</option>
//         <option value="Fiat">Fiat</option>
//       </select>
//     </form>
//   );
// }

function MyForm(){
  const [inputs, setInputs] = useState({tomato: true, onion: false});
    const handleChange = (e) => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      setInputs(values => ({...values, [name]: value}))

    }
    const handleSubmit = (event) => {
      let fillings = '';
      if (inputs.tomato) fillings += 'tomato';
      if (inputs.onion){
        if (inputs.tomato) fillings += ' and ';
        fillings += 'onion';
    }

    if (fillings == '') fillings = 'no fillings';
    alert(`${inputs.firstname} wants a burger with ${fillings}`);
    event.preventDefault();
  }
    return (
      <form onSubmit= {handleSubmit}>
        <label> My name is: 
          <input type='text' name='firstname' value={inputs.firstname} onChange={handleChange}></input>
        </label>

        <p>I want a burger with: </p>
        <label>Tomato: 
         <input type='checkbox' name='tomato' checked = {inputs.tomato} onChange={handleChange}></input>
        </label>
        <label>Onion: 
        <input type='checkbox' name='onion' checked = {inputs.onion} onChange={handleChange}></input>
        </label>
       <label>
          <button type="submit">Submit</button>
        </label>
      </form>
  )
};


createRoot(document.getElementById('head')).render(
  <MainApp/>
);

// createRoot(document.getElementById('next')).render(
//   <Alert/>
// );

createRoot(document.getElementById('third')).render(
  <Football/>
);

createRoot(document.getElementById('fourth')).render(
  <Goal isGoal={true} />
);


createRoot(document.getElementById('fifth')).render(
  <Car carinfo = {{color: "White", brand:"Ford", model:"Mustang", year:2000}} />
);


createRoot(document.getElementById('sixth')).render(
  <MyCars />
);


createRoot(document.getElementById('seventh')).render(
  
);

