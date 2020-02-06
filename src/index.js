import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes/Routes';
import './App.css';


const App=()=>(
	<Routes />
);

ReactDOM.render(<App />, document.getElementById('root'));
