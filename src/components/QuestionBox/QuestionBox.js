import './QuestionBox.css';
import '../common.css';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function QuestionBox(props) {
  const { hostView, item } = props

  return (
      <div className="QuestionBox">
        <header className="QuestionBox-header">
          {item && item.coverText && !hostView && !item.isDiscovered &&
              <div className="QuestionBox-cover">
                <div className="spacer" />
                <div className="spacer" />
                <div>{item.coverText}</div>
                <div className="spacer" />
                <div className="spacer" />
              </div>
          }
          {item && item.text &&
              <div
                  className={"QuestionBox-question " + (hostView ? hostViewClass : "") + " " + (item.isDiscovered ? isDiscoveredClass : "")}>
                <div className="QuestionBox-text">
                  {(item.isDiscovered || hostView) && <>
                    <div className="spacer" />
                    {item.text}
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
