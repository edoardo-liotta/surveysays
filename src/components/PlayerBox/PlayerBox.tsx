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
import { Cancel, Circle, Edit } from '@mui/icons-material'

const hostViewClass = 'host-view'
const isActiveClass = 'is-active'

type PlayerBoxProps = {
  name: string
  active: boolean
  score: number
  hostView: boolean
  onManualEditScore: (name: string, score: number) => void
  setActivePlayer: (name?: string) => void
  strikes: number
  maxStrikes?: number
  onSetStrikeCount: (name: string, count: number) => void
}

type PlayerBoxState = {
  previousScore: number
  editDialogOpen: boolean
  id: string
}
class PlayerBox extends Component<PlayerBoxProps, PlayerBoxState> {
  constructor(props: PlayerBoxProps) {
    super(props)
    this.state = {
      previousScore: props.score || 0,
      editDialogOpen: false,
      id: '' + Math.random(),
    }
  }
  afterAnimateScore = () => {
    this.setState({ previousScore: this.props.score })
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
    const { name, hostView, active, score, setActivePlayer } = this.props
    const { editDialogOpen, previousScore } = this.state

    const toggleState = () => {
      if (!active) setActivePlayer(name)
      else setActivePlayer()
    }

    return (
      <div
        className={
          'PlayerBox ' +
          (hostView ? hostViewClass : '') +
          ' ' +
          (active ? isActiveClass : '')
        }
      >
        <div className={'info'} onClick={toggleState}>
          <div>{name}</div>
          <div className={'score-box'}>
            <div>
              <CountUp
                start={previousScore}
                end={score}
                onEnd={this.afterAnimateScore}
              />
            </div>
            {hostView && (
              <>
                <div className={'edit'}>
                  <IconButton
                    onClick={this.handleDialogClickOpen}
                    size={'small'}
                  >
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
        </div>
        <div className={'strike-box'}>
          {[...Array(this.props.maxStrikes ?? 3)].map((_e, i) => {
            const id = `${this.props.name}_strike-button_${i + 1}`
            const isInactive = this.props.strikes <= i
            const isActive = !isInactive
            return (
              <IconButton
                key={id}
                id={id}
                size={'small'}
                onClick={() =>
                  this.props.onSetStrikeCount &&
                  this.props.onSetStrikeCount(this.props.name, i + 1)
                }
                className={isActive ? 'active' : ''}
              >
                <Cancel />
              </IconButton>
            )
          })}
          {hostView && (
            <span className={'reset-button'}>
              <IconButton
                id={`${this.props.name}_strike-button_0`}
                size={'small'}
                onClick={() =>
                  this.props.onSetStrikeCount &&
                  this.props.onSetStrikeCount(this.props.name, 0)
                }
              >
                <Circle htmlColor={'lightgray'} />
              </IconButton>
            </span>
          )}
        </div>
      </div>
    )
  }
}

export default PlayerBox
