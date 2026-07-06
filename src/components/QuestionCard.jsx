import styles from './QuestionCard.module.css';

function QuestionCard({imageUrl, question, answer, showAnswer}) {
  return (
    <div className={`${styles.questionCard} drop-shadow`}>
      { imageUrl && <img src={imageUrl} alt={`${answer} image`} /> }
      <h1>{question}</h1>
      {
        showAnswer && 
        <>
          <hr className={styles.xDivLine} />
          <p>{answer}</p>
        </>
      }

    </div>
  )
}

export default QuestionCard;
