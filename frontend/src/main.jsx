import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

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
    <CustomTable data={data} columns={columns} onEdit={handleEdit} editingId={editingId} editedData={editedData} onSave={handleSave} onChange={handleChange}/>

  );

}


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




createRoot(document.getElementById('head')).render(
  <MainApp/>
);
