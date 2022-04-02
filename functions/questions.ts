import { QuestionData, randomQuestions } from "./utils/helper";

export const onRequestGet = async () => {
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  };

  const res = await fetch(
    "https://autoshkolla-web.pages.dev/questions.json",
    init
  );
  const questions: QuestionData = await res.json();
  const selectedQuestions = randomQuestions(questions);

  return new Response(JSON.stringify(selectedQuestions), init);
};
