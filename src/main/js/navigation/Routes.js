import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Carlist from '../components/Carlist';
import AddCar from '../components/AddCar';

const Routes = () => (
  		 <Router>
	      <div>
	        <Route exact path="/" component={Carlist} />
			<Route path='/carlist' component={Carlist} />
			<Route path='/addcar' component={AddCar} />
	      </div>
	    </Router>
)

export default Routes
