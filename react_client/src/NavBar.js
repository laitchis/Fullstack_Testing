import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/input">Input</Button>
        <Button color="inherit" component={Link} to="/output">Output</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;