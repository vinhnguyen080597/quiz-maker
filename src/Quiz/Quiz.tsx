import React, { ReactElement, useEffect, useState } from 'react';
import { Question } from '../App';

interface IQuiz {
  questions: Question[]
}
export const Quiz = ({questions}: IQuiz): ReactElement => {
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: number]: string }>({});
  const [answers, setAnswers] = useState<string[]>([]);
  const [showSubmit, setShowSubmit] = useState(false)

  const getShuffledAnswers = (question: Question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  };
  
  const handleAnswerClick = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
    setCurrentAnswers({ ...currentAnswers, [questionIndex]: answer });
    if (updatedAnswers.filter(a => a).length === questions.length) {
      setShowSubmit(true);
    }
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <div>
            {getShuffledAnswers(question).map((answer, i) => (
              <button
                key={i}
                onClick={() => handleAnswerClick(index, answer)}
                style={{
                  backgroundColor: currentAnswers[index] === answer ? 'lightblue' : 'white'
                }}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
  