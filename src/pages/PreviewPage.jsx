import styles from './PreviewPage.module.css';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';
import {funCardMap} from '../utilities/quizState';

function PreviewLayout() {
  const {gameData, loading} = useContext(QuizContext);
  const {id} = useParams();
  const [showAnswer, setShowAnswer] = useState(false);
  const [numOfTeams, setNumOfTeams] = useState(1);
  const [numOfQuizzes, setNumOfQuizzes] = useState(8);

  if (loading) return null;
  const game = gameData.find(game => game.id === id);
  const totalQuizzes = game.totalQuizzes;

  function handlePlay() {
    const gameUrl = `${import.meta.env.BASE_URL}#/gamePage/${id}?teams=${numOfTeams}&numOfQuizzes=${numOfQuizzes}`;
    window.open(gameUrl, '_blank');
  }

  return (
    <div className={styles.layoutContainer}>
      <section className={styles.leftSection}>
        <img src={game.coverImage} alt={`${game.title} thumbnail`} />
        <h1>{game.title}</h1>
        <p>{game.description}</p>
        <hr className={styles.xDivLine} />

        <div className={styles.quizInfo}>
          <span className={styles.grade}>{game.grade === "KG" ? game.grade : `G-${game.grade}`}</span>
          <span className={styles.subject}>{game.subject}</span>
          <span className={styles.totalQuiz}>{`${game.totalQuizzes}Qs`}</span>
          <span className={styles.totalPlays}>{`▶️${game.totalPlays}`}</span>
        </div>
        <hr className={styles.xDivLine} />

        <h1>Preview Answers</h1>
        <div className={styles.btnContainer}>
          <label className={`${styles.ansToggleBtn} ${showAnswer ? styles.activeRadio : ''}`} ><input type='radio' name='toggleAnswer' value={true} checked={showAnswer} onChange={(e) => {setShowAnswer(true)}}/>Show</label>
          <label className={`${styles.ansToggleBtn} ${!showAnswer ? styles.activeRadio : ''}`} ><input type='radio' name='toggleAnswer' value={false} checked={!showAnswer} onChange={(e) => {setShowAnswer(false)}}/>Hide</label>
        </div>

        <div className={styles.quizSetting}>
          <h2>Number of Teams</h2>
          <div className={styles.selectContainer}>
            <label className={`${styles.radio} ${numOfTeams === 1 ? styles.activeRadio : ''}`} ><input type='radio' name='teamSelection' value={1} checked={numOfTeams === 1} onChange={(e) => {setNumOfTeams(Number(e.target.value))}}/>1</label>
            <label className={`${styles.radio} ${numOfTeams === 2 ? styles.activeRadio : ''}`}><input type='radio' name='teamSelection' value={2} checked={numOfTeams === 2} onChange={(e) => {setNumOfTeams(Number(e.target.value))}}/>2</label>
            <label className={`${styles.radio} ${numOfTeams === 3 ? styles.activeRadio : ''}`}><input type='radio' name='teamSelection' value={3} checked={numOfTeams === 3} onChange={(e) => {setNumOfTeams(Number(e.target.value))}}/>3</label>
          </div>
          <h2>Number of Questions</h2>
          <div className={styles.selectContainer}>
            <label className={`${styles.radio} ${numOfQuizzes === 8 ? styles.activeRadio : ''} ${totalQuizzes < 8 - funCardMap[8] ? styles.disabled : ''}`}><input type='radio' name='numOfQuestions' value={8} checked={numOfQuizzes === 8} disabled={totalQuizzes < 8 - funCardMap[8]} onChange={(e) => {setNumOfQuizzes(Number(e.target.value))}}/>8</label>
            <label className={`${styles.radio} ${numOfQuizzes === 16 ? styles.activeRadio : ''} ${totalQuizzes < 16 - funCardMap[16] ? styles.disabled : ''}`}><input type='radio' name='numOfQuestions' value={16} checked={numOfQuizzes === 16} disabled={totalQuizzes < 16 - funCardMap[16]} onChange={(e) => {setNumOfQuizzes(Number(e.target.value))}}/>16</label>
            <label className={`${styles.radio} ${numOfQuizzes === 24 ? styles.activeRadio : ''} ${totalQuizzes < 24 - funCardMap[24] ? styles.disabled : ''}`}><input type='radio' name='numOfQuestions' value={24} checked={numOfQuizzes === 24} disabled={totalQuizzes < 24 - funCardMap[24]} onChange={(e) => {setNumOfQuizzes(Number(e.target.value))}}/>24</label>
          </div>
        </div>

        <button
          className={styles.playBtn}
          onClick={() => {
            handlePlay();
          }}>Play</button>
      </section>

      <section className={styles.rightSection}>
        {
          game.quizData.map(quiz => {
            return (
              <QuestionCard key={quiz.id} imageUrl={quiz.imageUrl || ''} question={quiz.questions} answer={quiz.answers} showAnswer={showAnswer} />
            )
          })
        }
      </section>
    </div>
  )
}

function PreviewPage() {
  return (
    <main className={styles.previewPage}>
      <Header />
      <PreviewLayout />
    </main>
  )
}

export default PreviewPage;
