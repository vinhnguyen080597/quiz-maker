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
  allAnswers: string[]
}

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setIsLoading(false);
      })
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
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };


  return (
    <div className="App">
      <h1>QUIZ MARKER</h1>
      {isLoading ? (
        <div> Loading ...</div>
      ) : (
        <div>
          <TriviaCategory
            categories={categories}
            handleCreateQuiz={handleCreateQuiz}
          />
          {questions.length > 0 && <Quiz questions={questions} />}
        </div>
      )}
    </div>
  );
};

export default App;
