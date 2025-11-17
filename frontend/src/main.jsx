import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import Car from './Vehicle.jsx'

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

function MyForm(){
  const [name, setName] = useState("John");

  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <form>
      <label>Enter your name:
        <input 
          type="text" 
          value={name} 
          onChange={handleChange}
        /> 
      </label>
      <p> Current value: {name}</p>
    </form>
  );
}



createRoot(document.getElementById('head')).render(
  <Intro/>
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
  <MyForm />
);

