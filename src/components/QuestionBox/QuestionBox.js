import './QuestionBox.css';
import '../common.css';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function QuestionBox(props) {
  const { hostView, isDiscovered, coverText, text } = props

  return (
      <div className="QuestionBox">
        <header className="QuestionBox-header">
          {coverText && !hostView && !isDiscovered &&
              <div className="QuestionBox-cover">
                <div className="spacer" />
                <div className="spacer" />
                <div>{coverText}</div>
                <div className="spacer" />
                <div className="spacer" />
              </div>
          }
          {text &&
              <div
                  className={"QuestionBox-question " + (hostView ? hostViewClass : "") + " " + (isDiscovered ? isDiscoveredClass : "")}>
                <div className="QuestionBox-text">
                  {(isDiscovered || hostView) && <>
                    <div className="spacer" />
                    {text}
                    <div className="spacer" />
                  </>}
                </div>
              </div>
          }

        </header>
      </div>
  );
}

export default QuestionBox;
