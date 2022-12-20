import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { defaultConfiguration, getRoundId, setConfiguration } from '../../api/config-api';

const Configuration = (props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const triggerEditDialogOpen = () => setEditDialogOpen(true)
  const triggerEditDialogClose = () => setEditDialogOpen(false)
  const updateConfig = () => {
    const defaultConfig = defaultConfiguration()
    const roundIdField = document.getElementById("config-roundId")
    if (roundIdField) {
      const newRoundId = parseInt(roundIdField.value)
      const newConfig = { ...defaultConfig, roundId: newRoundId }
      setConfiguration(newConfig)
      if (props.onSave) {
        props.onSave(newConfig)
      }
    }
    triggerEditDialogClose()
  }

  return <>
    <Button onClick={triggerEditDialogOpen}>Configure</Button>
    <Dialog open={editDialogOpen} onClose={triggerEditDialogClose}>
      <DialogTitle>Configurazione</DialogTitle>
      <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="config-roundId"
            label="Round ID"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={getRoundId()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={triggerEditDialogClose}>Annulla</Button>
        <Button onClick={updateConfig}>Conferma</Button>
      </DialogActions>
    </Dialog>
  </>
}

export default Configuration