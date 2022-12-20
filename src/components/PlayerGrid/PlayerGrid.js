import './PlayerGrid.css';
import '../common.css';
import PlayerBox from '../PlayerBox/PlayerBox';

function PlayerGrid(props) {
  const { players } = props

  function playerBox(item) {
    return <>
      <PlayerBox key={JSON.stringify(item)} active={item.active || false} name={item.name || "Unknown"}
                 score={item.score || 0} />
    </>
  }

  return (
      <div className="PlayerGrid">
        {players && players.map(function (item) {
          return playerBox(item)
        })}
      </div>
  );
}

export default PlayerGrid;
