import styles from './GameHeader.module.css';
import vsLineImg from '../assets/images/vs-line.png';
import editBtn from '../assets/images/edit-btn.png';
import { useContext, useState, useEffect, useRef, Fragment } from 'react';
import { QuizContext } from '../contexts/QuizContext';

function Teams({teamData, setTeamData, numOfTeams, numOfQuizzes }) {
  const { score, cardType,teamChanges, clickedCard, currentTeamIndex, setCurrentTeamIndex, otherTeamIndex } = useContext(QuizContext);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setTeamData(prev => ({
      ...prev,
      [`team${cardType === 'otherTeam' ? otherTeamIndex : currentTeamIndex}`]: {
        ...prev[`team${cardType === 'otherTeam' ? otherTeamIndex : currentTeamIndex}`],
        score: prev[`team${cardType === 'otherTeam' ? otherTeamIndex : currentTeamIndex}`].score + score,
      }
    }));
    setCurrentTeamIndex(prev => prev >= numOfTeams - 1 ? 0 : prev + 1);
  }, [teamChanges]);


  // Render the teams and their data
  return (
    Object.values(teamData).map((team, index) => {
      const isLastTeam = index === numOfTeams - 1;
      return (
        <Fragment key={team.id}>
          <div className={styles.teamGroup}>
            <h1 className={currentTeamIndex === index ? styles.highlightTeam : ''}>{team.name}</h1>
            <h2>{team.score}</h2>
          </div>
          {!isLastTeam && <img className={styles.vsLine} src={vsLineImg} alt="vs line" />}
        </Fragment>
      )
    })
  )
}

function GameHeader({teamData, setTeamData , setEditName, numOfTeams, numOfQuizzes}) {
  return (
    <header className={styles.gameHeader}>
      <Teams teamData={teamData} setTeamData={setTeamData} numOfTeams={numOfTeams} numOfQuizzes={numOfQuizzes}/>
      <button className={styles.editBtn}>
        <img src={editBtn} alt='edit names' onClick={() => setEditName(prev => !prev)}/>
      </button>
    </header>
  );
}

export default GameHeader;
