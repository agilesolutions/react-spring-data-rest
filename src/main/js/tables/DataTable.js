import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';

// https://devhub.io/repos/hyojin-material-ui-datatables

const TABLE_COLUMNS = [
	  {
	    key: 'name',
	    label: 'Dessert (100g serving)',
	  }, {
	    key: 'calories',
	    label: 'Calories'
	  }
	];

const TABLE_DATA = [
	  {
	    name: 'Frozen yogurt',
	    calories: '159'
	  }, {
	    name: 'Ice cream sandwich',
	    calories: '159'
	  }
	];


function DataTable(props) {
	  const { classes } = props;

	  return (
	      <DataTables
	        height={'auto'}
	        selectable={false}
	        showRowHover={true}
	        columns={TABLE_COLUMNS}
	        data={TABLE_DATA}
	        showCheckboxes={false}
	        onCellClick={this.handleCellClick}
	        onCellDoubleClick={this.handleCellDoubleClick}
	        onFilterValueChange={this.handleFilterValueChange}
	        onSortOrderChange={this.handleSortOrderChange}
	        page={1}
	        count={100}
	      />
	    );
}



export default withStyles(styles)(DataTable);