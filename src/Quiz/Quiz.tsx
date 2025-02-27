import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Question } from "../App";

interface IQuiz {
  questions: Question[];
}

export const Quiz = ({ questions }: IQuiz): ReactElement => {
  const [currentAnswers, setCurrentAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [answers, setAnswers] = useState<string[]>([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [isValidateAnswerSubmit, setIsValidateAnswerSubmit] = useState(false);
  const [countScore, setCountScore] = useState(0)
  const mappedQuestions = useRef<Question[]>([]);

  const getShuffledAnswers = useMemo(() => {
    const _mappedQuestions = [...questions].map((ques, idx) => {
      return {
        ...ques,
        allAnswers: isValidateAnswerSubmit
          ? mappedQuestions.current[idx].allAnswers
          : [...ques.incorrect_answers, ques.correct_answer].sort(
              () => Math.random() - 0.5
            ),
      };
    });
    if (!isValidateAnswerSubmit) mappedQuestions.current = [..._mappedQuestions];
    console.log("-=-=  mappedQuestions.current", isValidateAnswerSubmit, mappedQuestions.current)
    return _mappedQuestions;
  }, [isValidateAnswerSubmit]);


  const handleAnswerClick = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
    setCurrentAnswers({ ...currentAnswers, [questionIndex]: answer });
    if (updatedAnswers.filter((a) => a).length === questions.length) {
      setShowSubmit(true);
    }
  };

  const getAnswers = (index: number, answer: string) => {
    if (isValidateAnswerSubmit) {
      if (currentAnswers[index] === answer) {
        return currentAnswers[index] === questions[index].correct_answer
          ? "green "
          : "red";
      } else
        return answer === questions[index].correct_answer ? "green " : "white";
    }
    return currentAnswers[index] === answer ? "lightblue" : "white";
  };

  useEffect(() => {
    const score = questions.filter((ques, idx) => {
      return currentAnswers[idx] === ques.correct_answer
    })
    setCountScore(score.length)
  },[isValidateAnswerSubmit])
  return (
    <>
      <div>
        {getShuffledAnswers.map((question, index) => (
          <div key={index}>
            <h3>{question.question}</h3>
            <div>
              {question.allAnswers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerClick(index, answer)}
                  style={{
                    backgroundColor: getAnswers(index, answer),
                  }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {
        isValidateAnswerSubmit && <div>

          {countScore}
        </div>
      }

      {showSubmit && (
        <div>
          <button
            onClick={() => setIsValidateAnswerSubmit(true)}
            style={{
              backgroundColor: "gray",
              width: "30%",
              marginTop: "20px",
              padding: "5px 0px",
            }}
          >
            {" "}
            Submit
          </button>
        </div>
      )}
    </>
  );
};
