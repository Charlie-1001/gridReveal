import styles from './CardOverlay.module.css';
import closeBtn from '../assets/images/close-btn.png';
import correctSound from '../assets/sounds/eff-correct.mp3';
import incorrectSound from '../assets/sounds/eff-incorrect.wav';
import ansRevealSound from '../assets/sounds/eff-answer-reveal.mp3';
import { useState, useContext, useEffect, useRef } from 'react';
import { QuizContext } from '../contexts/QuizContext';

export function QuizOverlay({isOpen, onClose, data}) {
  if (!isOpen) return null;

  const {id, points, questions, answers, imageUrl} = data;
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [showCheckBtn, setShowCheckBtn] = useState(true);
  const {setScore, setTeamChanges, setClickedCard, setCardType} = useContext(QuizContext);
  const audioRefs = useRef({
    correct: new Audio(correctSound),
    incorrect: new Audio(incorrectSound),
    revealAnswer: new Audio(ansRevealSound),
  })

  function playSound(type) {
    const audio = audioRefs.current[type];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }

  return (
    <div className={styles.fullScreenOverlay}>
      <div className={`${styles.quizOverlay} drop-shadow`}>
        <button className={styles.closeBtn} onClick={onClose}><img src= {closeBtn} /></button>
        <div className={styles.upperPart}>
          <p>{points}</p>
          {imageUrl && <img className={styles.quizImg} src={imageUrl} alt={`${answers} image`} />}
          <h1>{questions}</h1>
        </div>
        <hr className={styles.xDivLine} />
        <div className={styles.lowerPart}>
          {
            showCheckBtn &&
            <button className={styles.checkBtn} onClick={() => {
              setRevealAnswer(true);
              setShowCheckBtn(false);
              playSound('revealAnswer');
            }}>Check</button>
          }
          { 
            revealAnswer &&
            <div className={styles.revealAnswer}>
              <p>{answers}</p>
              <hr className={styles.xDivLine} />
              <div className={styles.btnGroup}>
                <button
                  className={styles.yesBtn}
                  onClick={() => {
                    setCardType('thisTeam');
                    setScore(15);
                    setTeamChanges(perv => !perv);
                    setClickedCard(prev => [...prev, id]);
                    playSound('correct');
                    onClose()}
                  }>Yes</button>
                <button
                  className={styles.noBtn}
                  onClick={() => {
                    setCardType('thisTeam');
                    setScore(0);
                    setTeamChanges(perv => !perv); 
                    setClickedCard(prev => [...prev, id]);
                    playSound('incorrect');
                    onClose()}
                  }>No</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

  )
}

export function FunCardOverlay({teamData, isOpen, onClose, data, numOfTeams}) {
  if (!isOpen) return null;

  const {id, funType, valueType, name, value, imageUrl} = data;
  const {setScore, setTeamChanges, setClickedCard, currentTeamIndex, setCardType, setFunCardType, setOtherTeamIndex} = useContext(QuizContext);
  const teamIndices = Array.from({length: numOfTeams}, (_, i) => i);
  const otherTeamIndex = teamIndices.filter(index => index !== currentTeamIndex);
  const otherTeam = otherTeamIndex[Math.floor(Math.random() * otherTeamIndex.length)];
  const targetTeamIndex = funType === 'otherTeam' && numOfTeams > 1 ? otherTeam : currentTeamIndex;

  const audioRefs = useRef({
    correct: new Audio(correctSound),
    incorrect: new Audio(incorrectSound),
    revealAnswer: new Audio(ansRevealSound),
  })

  function playSound(type) {
    const audio = audioRefs.current[type];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }

  useEffect(() => {
    numOfTeams > 1 && setOtherTeamIndex(otherTeam);
  }, [otherTeam, setOtherTeamIndex]);

  return (
    <div className={styles.fullScreenOverlay}>
      <div className={`${styles.quizOverlay} drop-shadow`}>
        <button className={styles.closeBtn} onClick={onClose}><img src= {closeBtn} /></button>
        <div className={styles.upperPart}>
          {imageUrl && <img className={styles.quizImg} src={imageUrl} alt='fun image' />}
          <h1>
            {funType === 'otherTeam' && numOfTeams > 1 ? `Team ${otherTeam + 1} ${name}` : name}
          </h1>
        </div>
        <hr className={styles.xDivLine} />
        <div className={styles.lowerPart}>
          <button className={styles.checkBtn} onClick={() => {
            const currentScore = teamData[`team${targetTeamIndex}`]?.score || 0;
            setCardType(funType === 'otherTeam' && numOfTeams > 1 ? 'otherTeam' : 'thisTeam');
            setFunCardType(valueType);
            setScore(valueType === 'double' ? (currentScore * 2 - currentScore) : value);
            setTeamChanges(perv => !perv);
            setClickedCard(prev => [...prev, id]);
            playSound(valueType === 'win' || valueType === 'double' ? 'correct' : 'incorrect');
            onClose();
          }}>OK</button>
        </div>
      </div>
    </div>
  )
}
