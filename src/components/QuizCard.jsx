import styles from './QuizCard.module.css';

function QuizCard({imageUrl, title, description, grade, subject, totalQs, totalPlays, onSelect}) {
  return (
    <div className={`${styles.quizCard} drop-shadow`} onClick={onSelect}>
      <div className={styles.coverImg}>
        <img src={imageUrl || null} loading='lazy' alt={`${title} thumbnail`} />
      </div>
      <div className={styles.cardText}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <hr />
      <div className={styles.cardInfo}>
        <span className={styles.grade}>{grade === "KG" ? grade : `G-${grade}`}</span>
        <span className={styles.subject}>{subject}</span>
        <span className={styles.questions}>{`${totalQs}Qs`}</span>
        <span className={styles.plays}>{`▶️${totalPlays}`}</span>
      </div>
    </div>
  )
}

export default QuizCard;
