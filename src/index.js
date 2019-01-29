import React from 'react';
import ReactDOM,{render} from 'react-dom';
import './index.css';
import './css/style.css';
import App from './components/App';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import StorePicker from './components/StorePicker';
import Notfound from './components/Notfound';
import * as serviceWorker from './serviceWorker';
   
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
const repo = `/${window.location.pathname.split('/')[1]}`;
const Root =()=>{
	return(
		<BrowserRouter basename={repo}>
			<Switch>
				<Route exact path="/" component={StorePicker}/>
				<Route path="/store/:storeId" component={App}/>
				<Route component={Notfound}/>
			</Switch>
		</BrowserRouter>
	)

}


render(<Root/>,document.getElementById('root'));



serviceWorker.unregister(); 

