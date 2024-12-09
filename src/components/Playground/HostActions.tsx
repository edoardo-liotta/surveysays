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
import { Add, Cancel, Edit, SwipeVertical } from '@mui/icons-material'
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
}

const HostActions = ({
  onChangeRoundId,
  onToggle,
  onTriggerStrike,
  roundId,
  scoreAdditionMode,
  getRoundsFn,
}: HostActionsProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [roundListDrawerOpen, setRoundListDrawerOpen] = useState(false)
  const [newRoundId, setNewRoundId] = useState(roundId)

  const handleEditDialogOpen = () => setEditDialogOpen(true)
  const handleEditDialogClose = () => setEditDialogOpen(false)
  const handleRoundIdChange = () => {
    setRoundListDrawerOpen(false)
    onChangeRoundId(newRoundId)
    handleEditDialogClose()
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
        <DialogTitle>Cambia round</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="edit-roundId"
            label="Round ID"
            type="text"
            fullWidth
            variant="standard"
            value={newRoundId}
            onChange={e => setNewRoundId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Annulla</Button>
          <Button onClick={handleRoundIdChange}>Conferma</Button>
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
