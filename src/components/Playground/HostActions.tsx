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
  IconButton,
  TextField,
  Toolbar,
} from '@mui/material'
import { Add, Cancel, Edit, SwipeVertical } from '@mui/icons-material'
import React, { useState } from 'react'
import { ScoreAdditionMode } from '../../update-score-fn/score-addition-mode'

type HostActionsProps = {
  onToggle: () => void
  onTriggerStrike: () => void
  onChangeRoundId: (newRoundId: string) => void
  scoreAdditionMode: ScoreAdditionMode
  roundId: string
}

const HostActions = ({
  onChangeRoundId,
  onToggle,
  onTriggerStrike,
  roundId,
  scoreAdditionMode,
}: HostActionsProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [newRoundId, setNewRoundId] = useState(roundId)

  const handleEditDialogOpen = () => setEditDialogOpen(true)
  const handleEditDialogClose = () => setEditDialogOpen(false)
  const handleRoundIdChange = () => {
    onChangeRoundId(newRoundId)
    handleEditDialogClose()
  }

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
            <CardActionArea
              sx={{ padding: '0' }}
              onClick={handleEditDialogOpen}
            >
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
    </div>
  )
}

export default HostActions
