const render = () => {
    var ts = Math.round((new Date()).getTime() / 1000);
    ReactDOM.render(
      React.createElement(
        'div', 
        null, 
        'Unix Time',
        React.createElement('pre', null, ts),
      ),
      document.getElementById('unixtime'),
    );
  }
  
  setInterval(render, 1000);  