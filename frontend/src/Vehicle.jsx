let x = "Ford";

function Car(props) {
  if (props.carinfo){
    return (
    <> 
    My car is a {props.carinfo.color} {props.carinfo.year} {props.carinfo.brand} {props.carinfo.model}!
    </>
    );
  }
  else{
    const {model, brand, ... rest} = props;
    return ( 
    <>
      <p>My car is a {rest.color} {rest.year} {brand} {model}!</p>
    </>
  );

  }
  
}

export default Car;