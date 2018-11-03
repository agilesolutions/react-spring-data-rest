import React, {Component} from 'react';
import EnhancedTable from '../tables/EnhancedTable';

// https://hyojin.github.io/material-ui-datatables/
// https://material.io/design/components/data-tables.html#
// example from json https://github.com/gregnb/mui-datatables/issues/64
class Carlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], open: false, message: ''};
  }

  componentDidMount() {
	    this.fetchCars();
	  }
	  
	  // Fetch all cars
	  fetchCars = () => {
	    fetch('api/cars')
	    .then((response) => response.json()) 
	    .then((responseData) => { 
	      this.setState({ 
	        cars: responseData._embedded.cars,
	      }); 
	    })
	    .catch(err => console.error(err));   
	  }
  



  render() {
	  
	  const content = this.state.cars;
	  

    return (
    		<div>
    		 	<EnhancedTable rows={this.state.cars}/>
    		</div>
    );
  }
}

export default Carlist;