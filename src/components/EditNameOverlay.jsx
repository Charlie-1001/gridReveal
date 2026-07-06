import { useContext, useEffect, useState } from 'react';
import styles from './EditNameOverlay.module.css';
import { QuizContext } from '../contexts/QuizContext';

function EditNameOverlay({isOpen, onClose, teamData, setTeamData}) {
  const [draft, setDraft] = useState(teamData);

  function handleDone() {
    setTeamData(draft);
  }

  if (!isOpen) return;

  return (
    <div className={styles.fullScreenOverlay}>
      <div className={styles.editNameOverlay}>
        <h1>Edit Names</h1>
        {
          Object.keys(draft).map((team, index) => (
            <label htmlFor={team} key={team}>
              {`Team ${index + 1}`}

              <input 
                id={team} 
                value={draft[team].name} 
                onChange={data => setDraft(prev => ({
                  ...prev,
                  [team]: {
                    ...prev[team],
                    name: data.target.value,
                  }
                }))}
              />
            </label>
          ))
        }
        <button className={styles.doneBtn} onClick={() => {handleDone(); onClose();}}>Done</button>
      </div>
    </div>
  )
}

export default EditNameOverlay;
