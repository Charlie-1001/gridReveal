import { createContext, useState, useEffect } from "react";
import LoadExcel from "../utilities/excelLoader";

export const QuizContext = createContext();

export function QuizProvider({children}) {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [otherTeam, setOtherTeam] = useState(0);
  const [clickedCard, setClickedCard] = useState([]);
  const [otherTeamIndex, setOtherTeamIndex] = useState(null);
  const [teamChanges, setTeamChanges] = useState(false);
  const [cardType, setCardType] = useState('');
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  useEffect(() => {
    LoadExcel().then(data => {
      setGameData(data);
      setLoading(false);
    })
  }, [])

  return (
    <QuizContext.Provider value={{
      gameData, loading,
      score, setScore,
      teamChanges, setTeamChanges,
      clickedCard, setClickedCard,
      otherTeam, setOtherTeam,
      currentTeamIndex, setCurrentTeamIndex,
      otherTeamIndex, setOtherTeamIndex,
      cardType, setCardType,
    }}>
      {children}
    </QuizContext.Provider>
  )
}