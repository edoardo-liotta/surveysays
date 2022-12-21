import './ListItem.css';
import '../common.css';
import { Component, createRef } from 'react';
import ServiceApi from '../../api/service-api';
import { CSSTransition } from 'react-transition-group';
import { playDing } from '../../api/audio-api';

const hostViewClass = "host-view"
const isRevealedClass = "is-revealed"
const serviceApi = new ServiceApi()

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: props.isRevealed,
      animateRevealed: props.isRevealed
    }
    this.nodeRef = createRef();
  }

  triggerToggleRevealed = () => {
    let initialState = this.state.revealed;
    let newRevealedState = !initialState;
    this.animateToggle(newRevealedState)
    const id = this.props.id;
    if (id && "compressed-answers" !== id) {
      serviceApi.updateRound(this.props.roundId, id, newRevealedState, (_) => {
      }, (_) => this.animateToggle(initialState))
    }
  }

  animateToggle = (newRevealedState) => {
    this.setState({
      animateRevealed: newRevealedState
    })
    if (newRevealedState === true && this.props.hostView !== true) {
      playDing()
    }
  }

  toggleRevealed = () => {
    let newRevealed = this.state.animateRevealed;
    this.setState({
      revealed: newRevealed
    })
    if (this.props.onToggleReveal) this.props.onToggleReveal(this.props.id, newRevealed)
  }

  render() {
    const { id, hostView, coverText, text, points } = this.props
    const { revealed, animateRevealed } = this.state

    return (
        <div className="ListItem" key={id} onClick={this.triggerToggleRevealed}>
          <header
              className={"ListItem-header " + (hostView ? hostViewClass : "") + " " + (revealed ? isRevealedClass : "")}>
            <CSSTransition nodeRef={this.nodeRef} in={animateRevealed} timeout={300}
                           classNames={isRevealedClass} onEntering={this.toggleRevealed} onExited={this.toggleRevealed}>
              <div ref={this.nodeRef}>
                {coverText && !hostView && !revealed &&
                    <div className="ListItem-number">
                      <div className="spacer" />
                      <div className="spacer" />
                      <div>{coverText}</div>
                      <div className="spacer" />
                      <div className="spacer" />
                    </div>
                }

                {text &&
                    <div
                        className={"ListItem-answer " + (hostView ? hostViewClass : "") + " " + (revealed ? isRevealedClass : "")}>
                      <div className="ListItem-text">
                        {coverText &&
                            <div className="ListItem-number">
                              <div className="spacer" />
                              <div>{coverText}</div>
                              <div className="spacer" />
                            </div>
                        }
                        <div className="spacer" />
                        {text}
                        <div className="spacer" />
                      </div>
                      {points &&
                          <div className="ListItem-points">
                            {points}
                          </div>
                      }
                    </div>
                }
              </div>
            </CSSTransition>
          </header>
        </div>
    );
  }
}

export default ListItem;
