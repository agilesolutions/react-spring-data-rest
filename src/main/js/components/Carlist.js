import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";

// https://www.npmjs.com/package/mui-datatables
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
	  
	  const data = this.state.cars;
	  const rows = [];
	  
	  data.map(r => {
		  var row = [];
		  row.push(r.brand);
		  row.push(r.model);
		  row.push(r.color);
		  row.push(r.registerNumber);
		  row.push(r.year);
		  row.push(r.price);
		  
		  rows.push(row);});
	  
	  
	    const columns = ["brand", "model", "color", "registerNumber", "year", "price"];

	    const options = {
	      filter: true,
	      filterType: 'dropdown',
	      responsive: 'stacked',
	    };

	  

    return (
    	   <MUIDataTable title={"ACME Employee list"} data={rows} columns={columns} options={options} />
      );
  }
}

export default Carlist;