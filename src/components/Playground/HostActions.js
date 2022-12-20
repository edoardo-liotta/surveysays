import './Playground.css';
import '../common.css';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { Add, Cancel, Menu, SwipeVertical } from '@mui/icons-material';
import { ScoreAdditionMode } from './Playground';

function HostActions(props) {
  return <div className={"HostActions"}>
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit" onClick={props.onTriggerStrike}>
          <Cancel htmlColor={"darkred"} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={props.onToggle}>
          {props.scoreAdditionMode === ScoreAdditionMode.ADD &&
              <Add />
          }
          {props.scoreAdditionMode === ScoreAdditionMode.STEAL &&
              <SwipeVertical />
          }
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