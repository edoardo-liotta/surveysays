import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import {
  getConfiguration,
  getRoundId,
  getServiceUrl,
  resetConfiguration,
  setConfiguration
} from '../../api/config-api';

const Configuration = (props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const triggerEditDialogOpen = () => setEditDialogOpen(true)
  const triggerEditDialogClose = () => setEditDialogOpen(false)
  const updateConfig = () => {
    const defaultConfig = getConfiguration()
    const newConfig = { ...defaultConfig }
    const roundIdField = document.getElementById("config-roundId")
    if (roundIdField) {
      newConfig.roundId = parseInt(roundIdField.value)
    }
    const serviceUrlField = document.getElementById("config-serviceUrl")
    if (serviceUrlField) {
      newConfig.serviceUrl = serviceUrlField.value
    }
    setConfiguration(newConfig)
    if (props.onSave) {
      props.onSave(newConfig)
    }
    triggerEditDialogClose()
  }

  const resetConfig = () => {
    resetConfiguration()
  }

  return <>
    <Button onClick={triggerEditDialogOpen} variant="outlined">Configure</Button>
    <Button onClick={resetConfig} variant="outlined">Reset configuration</Button>
    <Dialog open={editDialogOpen} onClose={triggerEditDialogClose}>
      <DialogTitle>Configurazione</DialogTitle>
      <DialogContent>
        <TextField
            autoFocus
            id="config-roundId"
            label="Round ID"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={getRoundId()}
        />
        <TextField
            id="config-serviceUrl"
            label="Service URL"
            type="url"
            fullWidth
            variant="standard"
            defaultValue={getServiceUrl()}
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