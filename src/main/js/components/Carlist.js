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
//	alert('start fetch in api cars');
//    React.fetch('api/cars')
//    .then((response) => {alert('response is there')}) 	
//    .catch(err => alert('kut'));  
  }
  
  



  render() {
	  
	  const content = [
		  {
				id: 1,
			    brand: 'Ford',
			    model: 'Mustang',
			    color: "Red",
			    registerNumber:	"ADF-1121",
			    year: 2017,
			    price: 59000
			  },
		  {
				id: 1,
			    brand: 'Nissan',
			    model: 'Leaf',
			    color: "White",
			    registerNumber:	"DTD-6887",
			    year: 2014,
			    price: 29000
		  },
		  {
				id: 1,
			    brand: 'Toyota',
			    model: 'Prius',
			    color: "Silver",
			    registerNumber:	"DHR-3633",
			    year: 2018,
			    price: 39000
			  }
		];	  
	  

    return (
    		<div>
    		 	<EnhancedTable rows={content}/>
    		</div>
    );
  }
}

export default Carlist;