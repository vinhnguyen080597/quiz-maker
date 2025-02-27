import React, {  ReactElement, useState } from "react";
import { Category } from "../App";


interface ITriviaCategory {
  categories: Category[],
  handleCreateQuiz: (selectedCategory: string, selectedDifficulty: string) => void
}
export const TriviaCategory = ({categories, handleCreateQuiz }: ITriviaCategory): ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && selectedDifficulty) {
      handleCreateQuiz(selectedCategory, selectedDifficulty)
    } else {
      alert('Please select both category and difficulty level');
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          id="difficultySelect"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button id="createBtn">Create Quiz</button>
      </form>
    </div>
  );
};
