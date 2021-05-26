function Button(props) {
  const handleClick = () => props.onClickFunction(props.increment);

  return /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, "Click Me");
}

function Display(props) {
  return /*#__PURE__*/React.createElement("div", null, props.message);
}

function App() {
  const [counter, setCounter] = React.useState(0);
  const [shadowCount, setShadowCount] = React.useState(0);

  const incrementCounter = incrementValue => {
    if (shadowCount < 3) {
      setCounter(counter + incrementValue);
      setShadowCount(shadowCount + incrementValue);
    } else if (shadowCount < 6) {
      setCounter("Stop click me already");
      setShadowCount(shadowCount + incrementValue);
    } else {
      setCounter("42");
      setShadowCount(shadowCount + incrementValue);
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    onClickFunction: incrementCounter,
    increment: 1
  }), /*#__PURE__*/React.createElement(Display, {
    message: counter
  }));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app42"));
