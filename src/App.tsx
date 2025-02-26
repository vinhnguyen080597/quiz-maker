import React, { useEffect, useState } from "react";
import "./App.css";
import { TriviaCategory } from "./TriviaCategory/TriviaCategory";
import { Quiz } from "./Quiz/Quiz";

export interface Category {
  id: number;
  name: string;
}
export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCreateQuiz = (
    selectedCategory: string,
    selectedDifficulty: string
  ) => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setAnswers(Array(5).fill(""));
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  const handleAnswerClick = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
    setCurrentAnswers({ ...currentAnswers, [questionIndex]: answer });
    if (updatedAnswers.filter((a) => a).length === questions.length) {
      setShowSubmit(true);
    }
  };

  return (
    <div className="App">
      <h1>QUIZ MARKER</h1>
      <TriviaCategory
        categories={categories}
        handleCreateQuiz={handleCreateQuiz}
      />
      <Quiz questions={questions} />
    </div>
  );
};

export default App;
