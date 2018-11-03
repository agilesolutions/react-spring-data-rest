import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import MenuAppBar from '../bars/MenuAppBar';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Routes from '../navigation/Routes';
import Carlist from './Carlist';
import AddCar from './AddCar';
import FormDialog from '../dialogs/FormDialog';
import AlertDialog from '../dialogs/AlertDialog';
import { Switch, Route } from 'react-router-dom'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 840,
    zIndex: 1,
    overflow: 'hidden',
    position: 'top',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  headerDiv: {
	height: 6,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

function ClippedDrawer(props) {
  const { classes } = props;

  return (
	// https://material-ui.com/layout/grid/
      <GridList cellHeight={180}>
        <GridListTile  cols={2} style={{ height: 'auto' }}>
      		<MenuAppBar/>
    	</GridListTile >
      	<GridListTile cols={1} style={{ height: 800, width: 'auto' }}>
      		<Drawer variant="permanent"
      				classes={{
      						paper: classes.drawerPaper,
      						}}>
      			<div className={classes.toolbar} />
      			<List>{mailFolderListItems}</List>
      			<Divider />
      			<List>{otherMailFolderListItems}</List>
      		</Drawer>
      	</GridListTile>
       	<GridListTile cols={1} style={{ height: 800, width: 1300 }}>
       	// https://stackoverflow.com/questions/49615742/how-to-properly-layout-main-contents-with-material-ui-next-mini-variant-drawer
       	// https://stackoverflow.com/questions/50801093/material-ui-drawer-selection-how-to-route
      		<main className={classes.content}>
     		 <Switch>
   	        	<Route exact path="/" component={Carlist} />
   	        	<Route path='/carlist' component={Carlist} />
   	        	<Route path='/addcar' component={AddCar} />
   	        	<Route path='/dialog' component={FormDialog} />
   	        	<Route path='/alertdialog' component={AlertDialog} />
   	        </Switch>
      		</main>
      	</GridListTile>
      </GridList>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
