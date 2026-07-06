import styles from './HomePage.module.css';
import Header from '../components/Header';
import QuizCard from '../components/QuizCard';
import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';

function SearchBar({searchText, setSearchText, selectedGrade, setSelectedGrade, selectedSubject, setSelectedSubject, grades, subjects}) {
  return (
    <div className={`${styles.searchBar} drop-shadow`}>
      {/* grade selection */}
      <select className={styles.gradeSelect} name="grade" id="grade" value={selectedGrade} onChange={data => setSelectedGrade(data.target.value)} >
        <option value="">Grade</option>
        <option value="all">All Grades</option>
        {
          grades.map(grade => (
            <option key={grade} value={grade}>{`Grade-${grade}`}</option>
          ))
        }
      </select>
      {/* Subjects selection */}
      <select className={styles.subjectSelect} name="subject" id="subject" value={selectedSubject} onChange={data => setSelectedSubject(data.target.value)} >
        <option value="">Subject</option>
        <option value="all">All Subjects</option>
        {
          subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))
        }
      </select>
      {/* Search input */}
      <input type="text" placeholder="Search for the games ..."
        value={searchText}
        onChange={data => setSearchText(data.target.value)}
      />
    </div>
  )
}

function QuizCards({searchText, selectedGrade, selectedSubject, gameData}) {
  const navigate = useNavigate();

  function handleSelect(quiz) {
    navigate(`/previewPage/${quiz.id}`);
  }

  const searchKeywords = searchText.toLowerCase().trim();
  const filteredSearch = gameData.filter(quiz => {
    const topicSelection = searchKeywords === '' || quiz.title?.toLowerCase().includes(searchKeywords) ||
      quiz.description?.toLowerCase().includes(searchKeywords);
    const gradeSelection = selectedGrade === '' || selectedGrade === 'all' || quiz.grade == selectedGrade;
    const subjectSelection = selectedSubject === '' || selectedSubject === 'all' || quiz.subject?.toLowerCase() == selectedSubject.toLowerCase();

    return topicSelection && gradeSelection && subjectSelection;
  })

  return (
    <div className={styles.quizContainer}>
      {filteredSearch.map(quiz => (
        <QuizCard
          key={quiz.id}
          imageUrl={quiz.coverImage}
          title={quiz.title}
          description={quiz.description}
          grade={quiz.grade}
          subject={quiz.subject}
          totalQs={quiz.quizData.length}
          totalPlays={quiz.totalPlays}
          onSelect={() => handleSelect(quiz)}
        />
      ))}
    </div>
  );
}

function HomePage() {
  const {gameData} = useContext(QuizContext);
  const [searchText, setSearchText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const grades = [...new Set(gameData.map(quiz => quiz.grade))];
  const subjects = [...new Set(gameData.map(quiz => quiz.subject))];

  return (
    <main className={styles.homePage}>
      <Header />
      <SearchBar
        searchText={searchText} setSearchText={setSearchText}
        selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade}
        selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        grades={grades} subjects={subjects}
      />
      <QuizCards
        searchText={searchText}
        selectedGrade={selectedGrade}
        selectedSubject={selectedSubject}
        gameData={gameData}
      />
    </main>
  )
}

export default HomePage;
