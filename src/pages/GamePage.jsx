import styles from './GamePage.module.css';
import GameHeader from '../components/GameHeader';
import WinnersPage from './WinnersPage';
import QuizGrid from '../components/QuizGrid';
import EditNameOverlay from '../components/EditNameOverlay';
import victorySound from '../assets/sounds/eff-victory.mp3';
import clappingSound from '../assets/sounds/eff-clapping.mp3';
import { useParams, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../contexts/QuizContext';

function GamePage() {
  const {id} = useParams();
  const {gameData, loading, clickedCard, teamChanges} = useContext(QuizContext);
  const [isDone, setIsDone] = useState(false);
  const [editName, setEditName] = useState(false);
  const [searchParams] = useSearchParams();
  const numOfTeams = Number(searchParams.get('teams'));
  const numOfQuizzes = Number(searchParams.get('numOfQuizzes'));

  // initialize the team data
  const [teamData, setTeamData] = useState(() => {
    const initialData = {};
    for (let i = 0; i < numOfTeams; i++) {
      initialData[`team${i}`] = {
        id: `team${i}`,
        score: 0,
        name: `Team ${i + 1}`,
      };
    }
    return initialData;
  });

  function closeEditNameOverlay() {
    setEditName(false);
  }

  useEffect(() => {
    if (clickedCard.length === numOfQuizzes) setIsDone(true);
  }, [teamChanges])

  if (isDone) {
    const victory = new Audio(victorySound);
    const clapping = new Audio(clappingSound);
    victory.play();
    clapping.play();
    return <WinnersPage teamData={teamData} />;
  }

  if (loading) return;
  const game = gameData.find(game => game.id === id);
  const quizzes = game.quizData;

  return (
    <main className={styles.gamePage}>
      <GameHeader teamData={teamData} setTeamData={setTeamData} setEditName={setEditName} numOfTeams={numOfTeams} numOfQuizzes={numOfQuizzes} />
      <QuizGrid quizzes={quizzes} numOfGrid={numOfQuizzes} numOfTeams={numOfTeams} clickedCard={clickedCard} editName={editName} />
      <EditNameOverlay isOpen={editName} onClose={closeEditNameOverlay} teamData={teamData} setTeamData={setTeamData} />
    </main> 
  )
}

export default GamePage;
