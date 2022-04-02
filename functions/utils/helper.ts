export type Question = {
  text: string;
  answer: boolean;
  image?: string;
};

export type QuestionData = {
  withImage: Question[];
  noImage: Question[];
};

export type QuestionList = Question & {
  userAnswer: boolean | null;
};

export const shuffleQuestion = (questions: Question[]) => {
  let currentIndex = questions.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [questions[currentIndex], questions[randomIndex]] = [
      questions[randomIndex],
      questions[currentIndex],
    ];
  }

  return questions;
};

type SelectQuestions = (args: {
  questions: Question[];
  max: number;
}) => Question[];

export const selectQuestions: SelectQuestions = ({ questions, max }) => {
  const selectedQuestions: Question[] = [];

  while (selectedQuestions.length !== max) {
    const random = Math.floor(Math.random() * (questions.length - 1));
    selectedQuestions.push(questions[random]);
    questions.splice(random, 1);
  }

  return selectedQuestions;
};

export const randomQuestions = (questions: QuestionData) => {
  const withImageQuestions: Question[] = selectQuestions({
    questions: questions.withImage,
    max: 30,
  });

  const noImageQuestions: Question[] = selectQuestions({
    questions: questions.noImage,
    max: 10,
  });

  return shuffleQuestion([...withImageQuestions, ...noImageQuestions]);
};
