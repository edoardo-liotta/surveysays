import './PlayerBox.css'
import '../common.css'
import React, { Component } from 'react'
import CountUp from 'react-countup'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import { Edit } from '@mui/icons-material'

const hostViewClass = 'host-view'
const isActiveClass = 'is-active'

type PlayerBoxProps = {
  name: string
  active: boolean
  score: number
  hostView: boolean
  onManualEditScore: (name: string, score: number) => void
  setActivePlayer: (name?: string) => void
}

type PlayerBoxState = {
  isActive: boolean
  score: number
  targetScore: number
  editDialogOpen: boolean
  id: string
}
class PlayerBox extends Component<PlayerBoxProps, PlayerBoxState> {
  constructor(props: PlayerBoxProps) {
    super(props)
    this.state = {
      isActive: props.active,
      score: props.score || 0,
      targetScore: props.score || 0,
      editDialogOpen: false,
      id: '' + Math.random(),
    }
  }

  setActive = (newActive: boolean) => {
    this.setState({
      isActive: newActive,
    })
  }

  setScore = (newScore: number) => {
    this.setState({ targetScore: newScore })
  }

  afterAnimateScore = () => {
    this.setState({ score: this.state.targetScore })
  }

  handleDialogClickOpen = () => {
    this.setState({ editDialogOpen: true })
  }

  handleDialogClose = () => {
    this.setState({ editDialogOpen: false })
  }

  triggerUpdateScore = () => {
    const inputField = document.getElementById(
      this.state.id,
    ) as HTMLInputElement | null
    if (inputField) {
      const newScore = parseInt(inputField.value)
      this.props.onManualEditScore(this.props.name, newScore)
    }
    this.handleDialogClose()
  }

  render() {
    const { name, hostView, setActivePlayer } = this.props
    const { editDialogOpen, isActive, score, targetScore } = this.state

    const toggleState = () => {
      if (!isActive) setActivePlayer(name)
      else setActivePlayer()
    }

    return (
      <div
        className={
          'PlayerBox ' +
          (hostView ? hostViewClass : '') +
          ' ' +
          (this.state.isActive ? isActiveClass : '')
        }
      >
        <div className={'info'} onClick={toggleState}>
          <span>{name}</span>
          <br />
          <span>
            <CountUp
              start={score}
              end={targetScore}
              onEnd={this.afterAnimateScore}
            />
          </span>
        </div>
        {hostView && (
          <>
            <div className={'edit'}>
              <IconButton onClick={this.handleDialogClickOpen}>
                <Edit htmlColor={'white'} />
              </IconButton>
            </div>
            <Dialog open={editDialogOpen} onClose={this.handleDialogClose}>
              <DialogTitle>Modifica punteggio di {name}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Inserisci il nuovo punteggio da assegnare
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id={this.state.id}
                  label="Punteggio"
                  type="number"
                  fullWidth
                  variant="standard"
                  defaultValue={score}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose}>Annulla</Button>
                <Button onClick={this.triggerUpdateScore}>Conferma</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    )
  }
}

export default PlayerBox
