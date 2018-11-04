// https://material.io/tools/icons/?style=baseline
// https://codesandbox.io/s/vqo8yw5om7

import React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeekendIcon from '@material-ui/icons/Weekend';
import DraftsIcon from '@material-ui/icons/Drafts';
import HeadsetIcon from '@material-ui/icons/HeadsetMic';
import StationIcon from '@material-ui/icons/LocalGasStation';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/RecordVoiceOver';


export const mailFolderListItems = (	
  <div>
    <ListItem button component={Link} to="/carlist">
      <ListItemIcon>
        <WeekendIcon />
      </ListItemIcon>
      <ListItemText primary="Lazying" />
    </ListItem>
    <ListItem button  component={Link} to="/addcar">
      <ListItemIcon>
        <HeadsetIcon />
      </ListItemIcon>
      <ListItemText primary="Calling" />
    </ListItem>
    <ListItem button  component={Link} to="/charts">
      <ListItemIcon>
        <StationIcon />
      </ListItemIcon>
      <ListItemText primary="Fill up" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);

