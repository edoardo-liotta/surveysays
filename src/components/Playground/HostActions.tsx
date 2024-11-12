import './Playground.css'
import '../common.css'
import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Toolbar,
} from '@mui/material'
import { Add, Cancel, SwipeVertical } from '@mui/icons-material'
import { ScoreAdditionMode } from './Playground'
import React from 'react'

type HostActionsProps = {
  onToggle: () => void
  onTriggerStrike: () => void
  scoreAdditionMode: ScoreAdditionMode
  roundId: string
}
function HostActions(props: HostActionsProps) {
  return (
    <div className={'HostActions'}>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={props.onTriggerStrike}>
            <Cancel htmlColor={'darkred'} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={props.onToggle}>
            {props.scoreAdditionMode === 'add' && <Add />}
            {props.scoreAdditionMode === 'steal' && <SwipeVertical />}
          </IconButton>
          <Box sx={{ flexGrow: 2 }} />
          <Card sx={{ minWidth: '80px' }}>
            <CardActionArea sx={{ padding: '0' }}>
              <CardContent>
                <div style={{ fontSize: 'large' }}>{props.roundId}</div>
              </CardContent>
            </CardActionArea>
          </Card>
          {/*<IconButton color="inherit">
            <Menu />
          </IconButton>*/}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default HostActions
