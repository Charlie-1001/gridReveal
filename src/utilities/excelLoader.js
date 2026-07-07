import * as XLSX from "xlsx";

async function LoadExcel() {
  const response = await fetch(import.meta.env.BASE_URL + "gameData/quiz-data.xlsx");
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, {
    type: "array",
  });

  const data = [];
  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const quizRange = XLSX.utils.sheet_to_json(worksheet, {range: "A8:D9999"});
    data.push(
      {
        id: sheetName.toLocaleLowerCase().trim().replace(/\s+/g, '-'),
        title: worksheet['B3']?.v ?? '',
        description: worksheet['B5']?.v ?? '',
        coverImage: worksheet['C3']?.v ?? '',
        grade: worksheet['A3']?.v ?? '',
        subject: worksheet['A5']?.v ?? '',
        totalPlays: 160,
        totalQuizzes: quizRange.length,
        quizData: quizRange.map((row, index) => ({
          id: `${sheetName}-${index}`,
          type: 'quiz',
          ...row,
        })),
      }
    );
  });

  return data;
}

export default LoadExcel;