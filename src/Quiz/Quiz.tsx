import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../APIHandler/api';
import { QuizQuestion, Question } from '../types';

const Quiz: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadQuestions = async () => {
      const questions: Question[] = await fetchQuizQuestions();
      const formattedQuestions = questions?.map((question) => ({
        question: question.question,
        options: [...question.incorrect_answers, question.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        answer: question.correct_answer,
      }));
      setQuizQuestions(formattedQuestions);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : currentQuestion < quizQuestions?.length ? (
        <div>
          <h2>{quizQuestions[currentQuestion].question}</h2>
          {quizQuestions[currentQuestion].options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <h2>Your Score: {score}/{quizQuestions?.length}</h2>
      )}
    </div>
  );
};

export default Quiz;
