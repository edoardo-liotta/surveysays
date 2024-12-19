import './Playground.css'
import '../common.css'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
} from '@mui/material'
import { Add, Cancel, Edit, People, SwipeVertical } from '@mui/icons-material'
import React, { useState } from 'react'
import { ScoreAdditionMode } from '../../update-score-fn/score-addition-mode'
import { RoundList } from '../RoundList/RoundList'
import { RoundInfo } from '../../domain/round-info'

type HostActionsProps = {
  onToggle: () => void
  onTriggerStrike: () => void
  onChangeRoundId: (newRoundId: string) => void
  scoreAdditionMode: ScoreAdditionMode
  roundId: string
  getRoundsFn: () => Promise<RoundInfo[]>
  playerNames: string[]
  onResetPlayerNames: (newPlayerNames: string[]) => void
}

const HostActions = ({
  onChangeRoundId,
  onToggle,
  onTriggerStrike,
  roundId,
  scoreAdditionMode,
  getRoundsFn,
  playerNames,
  onResetPlayerNames,
}: HostActionsProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [roundListDrawerOpen, setRoundListDrawerOpen] = useState(false)
  const [newPlayer1Name, setNewPlayer1Name] = useState(playerNames[0])
  const [newPlayer2Name, setNewPlayer2Name] = useState(playerNames[1])

  const handleEditDialogOpen = () => setEditDialogOpen(true)
  const handleEditDialogClose = () => setEditDialogOpen(false)
  const handleResetPlayerNames = () => {
    setRoundListDrawerOpen(false)
    setEditDialogOpen(false)
    onResetPlayerNames([newPlayer1Name, newPlayer2Name])
  }

  const toggleDrawer = () => setRoundListDrawerOpen(!roundListDrawerOpen)

  return (
    <div className={'HostActions'}>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={onTriggerStrike}>
            <Cancel htmlColor={'darkred'} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            id={'toggle-score-addition-mode-button'}
            color="inherit"
            onClick={onToggle}
          >
            {scoreAdditionMode === 'add' && <Add />}
            {scoreAdditionMode === 'steal' && <SwipeVertical />}
            {scoreAdditionMode === 'set' && <Edit />}
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 2 }} />
          <IconButton color="inherit" onClick={handleEditDialogOpen}>
            <People color={'inherit'} />
          </IconButton>
          <Card sx={{ minWidth: '80px' }}>
            <CardActionArea sx={{ padding: '0' }} onClick={toggleDrawer}>
              <CardContent>
                <div style={{ fontSize: 'large' }}>{roundId}</div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Toolbar>
      </AppBar>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Cambia nomi dei giocatori</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="edit-player-names-1"
            label="Left team"
            type="text"
            fullWidth
            variant="standard"
            value={newPlayer1Name}
            onChange={e => setNewPlayer1Name(e.target.value)}
          />
          <TextField
            autoFocus
            id="edit-player-names-2"
            label="Right team"
            type="text"
            fullWidth
            variant="standard"
            value={newPlayer2Name}
            onChange={e => setNewPlayer2Name(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Annulla</Button>
          <Button onClick={handleResetPlayerNames}>Conferma</Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="right"
        open={roundListDrawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '85vw',
            boxSizing: 'border-box',
          },
        }}
      >
        <RoundList getRoundsFn={getRoundsFn} onSelectRound={onChangeRoundId} />
      </Drawer>
    </div>
  )
}

export default HostActions
