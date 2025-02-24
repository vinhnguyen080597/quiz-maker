export type Question = {
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
  };
  
  export type QuizQuestion = {
    question: string;
    options: string[];
    answer: string;
  };
  