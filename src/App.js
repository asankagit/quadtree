import React from 'react';
import Chameleon from './lib';

function App() {
 
  return <div>
    Hello, React!
    {/* <img src="/test_gnuplot.png" width={400}/> */}
    <Chameleon height={300} width={300} src="test_gnuplot.png"/>
  </div>;
}

export default App;
