function Button(props) {
  const handleClick = () => props.onClickFunction(props.increment);
	return (
  	<button onClick={handleClick}>
      Click Me
    </button>
  );
}

function Display(props) {
	return (
  	<div>{props.message}</div>
  );
}

function App() {
	const [counter, setCounter] = React.useState(0);
  const [shadowCount, setShadowCount] = React.useState(0);
  
  const incrementCounter = (incrementValue) => {

            
              if (shadowCount <3) {
                setCounter(counter +incrementValue);
                setShadowCount(shadowCount +incrementValue);
              } else if (shadowCount <6) {
                setCounter("Stop click me already")
                setShadowCount(shadowCount +incrementValue);
              } else {
                setCounter("42")
                setShadowCount(shadowCount +incrementValue);
              }

            
  };
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