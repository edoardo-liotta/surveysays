import './PlayerBox.css';
import '../common.css';
import { Component } from 'react';
import CountUp from 'react-countup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const hostViewClass = "host-view"
const isActiveClass = "is-active"

class PlayerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.active,
      score: props.score || 0,
      targetScore: props.score || 0,
      editDialogOpen: false,
      id: "" + Math.random()
    }
  }

  setActive = (newActive) => {
    this.setState({
      isActive: newActive
    })
  }

  setScore = (newScore) => {
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
  };

  triggerUpdateScore = () => {
    const inputField = document.getElementById(this.state.id)
    if (inputField) {
      const newScore = parseInt(inputField.value)
      this.props.onManualEditScore(this.props.name, newScore)
    }
    this.handleDialogClose()
  }

  render() {
    const { name, hostView, setActivePlayer } = this.props
    const { editDialogOpen, isActive, score, targetScore } = this.state

    function toggleState() {
      const newName = isActive ? null : name
      setActivePlayer(newName)
    }

    return (
        <div
            className={"PlayerBox " + (hostView ? hostViewClass : "") + " " + (this.state.isActive ? isActiveClass : "")}>
          <div className={"info"} onClick={toggleState}>
            <span>{name}</span><br />
            <span><CountUp start={score} end={targetScore} onEnd={this.afterAnimateScore} /></span>
          </div>
          {hostView &&
              <>
                <div className={"edit"}>
                  <IconButton onClick={this.handleDialogClickOpen}>
                    <Edit htmlColor={"white"} />
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
          }
        </div>
    );
  }
}

export default PlayerBox;
