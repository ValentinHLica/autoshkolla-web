import { ImageDataLike } from "gatsby-plugin-image";

export type ExamOptions = "solved" | "help" | "normal";

export type Question = {
  text: string;
  answer: boolean;
  image?: {
    childrenImageSharp: {
      gatsbyImageData: ImageDataLike;
    }[];
  };
};

export type QuestionData = {
  withImage: Question[];
  noImage: Question[];
};

export type QuestionList = Question & {
  userAnswer: boolean | null;
};
