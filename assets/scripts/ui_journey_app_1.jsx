function Button(props) {
  const handleClick = () => props.onClickFunction(props.increment);
	return (
  	<button onClick={handleClick}>
      Click Me
    </button>
  );
}

function Display(props) {
  // Using a local var here to store a message.
  // As far as I can tell, it's fine to do this.
  // I'm also using let as per the community dislike of var.
  
  let messageValue = 0;
  if (props.message <=3) {
      messageValue = props.message;
  } else if (props.message <=4) {
      messageValue = "Stop clicking me already";
  } else if (props.message <=5) {
      messageValue = "Skynet launched to mend humanity";
  } else {
      messageValue = 42;
  }

  // I located thje display component message within the display component code.
  // The age old 'move things close together that are related' rule of thumb.
  
	return (
  	<div>{messageValue}</div>
  );
}

function App() {
	const [counter, setCounter] = React.useState(0);
  
  const incrementCounter = (incrementValue) => {setCounter(counter +incrementValue)};
	
  return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Display message={counter}/>
    </div>  
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById("app42"),
);