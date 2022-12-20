import './PlayerGrid.css';
import '../common.css';
import PlayerBox from '../PlayerBox/PlayerBox';

function PlayerGrid(props) {
  const { players, setActivePlayer } = props

  function playerBox(item) {
    return <PlayerBox key={item.name} ref={item.ref} active={item.active || false} name={item.name || "Unknown"}
                      score={item.score || 0} setActivePlayer={setActivePlayer} />

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
