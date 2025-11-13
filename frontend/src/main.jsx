import { createRoot } from 'react-dom/client'
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



createRoot(document.getElementById('head')).render(
  <Intro/>
)

// createRoot(document.getElementById('head')).render(
//   <Alert/>
// )