import styles from './QuizGrid.module.css';
import {QuizOverlay, FunCardOverlay} from './CardOverlay';
import { useState, useEffect } from 'react';
import {funCardMap} from '../utilities/quizState';
import winPointImg from '../assets/images/win-points.png';
import losePointImg from '../assets/images/lose-points.png';
import doublePointImg from '../assets/images/double-points.png';

function QuizGrid({quizzes, numOfGrid, numOfTeams, clickedCard, editName}) {
  const funCards = [
    // this team wins or loses points
    {id: 'fun1', type: 'fun', funType: 'thisTeam', valueType: 'win', name: 'Win 30 Points!', value: 30, imageUrl: winPointImg},
    {id: 'fun2', type: 'fun', funType: 'thisTeam', valueType: 'lose', name: 'Lose 30 Points!', value: -30, imageUrl: losePointImg},
    {id: 'fun3', type: 'fun', funType: 'thisTeam', valueType: 'win', name: 'Win 50 Points!', value: 50, imageUrl: winPointImg},
    {id: 'fun4', type: 'fun', funType: 'thisTeam', valueType: 'lose', name: 'Lose 50 Points!', value: -50, imageUrl: losePointImg},
    // other teams win or lose points
    {id: 'fun5', type: 'fun', funType: 'otherTeam', valueType: 'win', name: `wins 30 Points!`, value: 30, imageUrl: winPointImg},
    {id: 'fun6', type: 'fun', funType: 'otherTeam', valueType: 'lose', name: `loses 30 Points!`, value: -30, imageUrl: losePointImg},
    {id: 'fun7', type: 'fun', funType: 'otherTeam', valueType: 'win', name: `wins 50 Points!`, value: 50, imageUrl: winPointImg},
    {id: 'fun8', type: 'fun', funType: 'otherTeam', valueType: 'lose', name: `loses 50 Points!`, value: -50, imageUrl: losePointImg},
    // double points
    {id: 'fun9', type: 'fun', funType: 'thisTeam', valueType: 'double', name: 'Double Points!', value: 0, imageUrl: doublePointImg},
  ];

  const gridMap = {
    8: styles.eightGrid,
    16: styles.sixteenGrid,
    24: styles.twentyFourGrid,
  };

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [cardType, setCardType] = useState('');
  const [finalizedCards, setFinalizedCards] = useState([]);

  useEffect(() => {
    const shuffledFunCards = [...funCards].sort(() => Math.random() - 0.5);
    const selectedFunCards = shuffledFunCards.slice(0, numOfTeams > 1 ? funCardMap[numOfGrid] : 4); // only includes the first four fun cards for solo play
    const shuffledQuizzes = [...quizzes].sort(() => Math.random() - 0.5);
    const selectedQuizzes = shuffledQuizzes.slice(0, numOfGrid - selectedFunCards.length);
    const shuffledCards = [...selectedFunCards, ...selectedQuizzes].sort(() => Math.random() - 0.5);
    setFinalizedCards(shuffledCards);
  }, [numOfGrid, quizzes]);

  return(
    <>
      <div className={`${styles.quizGrid} ${gridMap[numOfGrid] || ''}`}>
        {
          finalizedCards.map((quiz, index) => (
            <div className={
              `${styles.quizCard} drop-shadow ${clickedCard.includes(quiz.id) ? styles.clickedCard : ''}`} 
              key={quiz.id}
              onClick={() => {
                if (clickedCard.includes(quiz.id)) return;
                setActiveQuiz(quiz);
                setCardType(quiz.type);
              }}
            >
              <h1>{index + 1}</h1>
            </div>
          ))
        }
      </div>
      {cardType === 'quiz' && <QuizOverlay isOpen={Boolean(activeQuiz)} onClose={() => setActiveQuiz(null)} data={activeQuiz}/>}
      {cardType === 'fun' && <FunCardOverlay isOpen={Boolean(activeQuiz)} onClose={() => setActiveQuiz(null)} data={activeQuiz} numOfTeams={numOfTeams}/>}
    </>
  )
}

export default QuizGrid;
