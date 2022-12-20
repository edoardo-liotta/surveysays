import './Playground.css';
import '../common.css';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { Cancel, Menu, SwipeDown } from '@mui/icons-material';

function HostActions(props) {
  return <div className={"HostActions"}>
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit">
          <Cancel htmlColor={"darkred"} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={props.triggerSteal}>
          <SwipeDown />
        </IconButton>
        <Box sx={{ flexGrow: 2 }} />
        <IconButton color="inherit">
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
}

export default HostActions