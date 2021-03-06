import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
} from "gatsby-plugin-image";

import { Question, QuestionList } from "@interface/utils";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import {
  CheckSolidIcon,
  ClockIcon,
  ImageIcon,
  LoadingIcon,
  QuestionMarkSolidIcon,
  RefreshIcon,
  XSolidIcon,
} from "@icon";
import { Button, Checkbox } from "@ui";

import * as styles from "@styles/pages/results.module.scss";

type Props = {
  location: {
    state: {
      questions: QuestionList[];
      timeCounter: number;
    } | null;
  };
  data: {
    dataYaml: {
      noImage: Question[];
      withImage: Question[];
    };
  };
};

const Results: React.FC<Props> = ({ location }) => {
  const [questions, setQuestions] = useState<QuestionList[]>([]);
  const [timeCounter, setTimeCounter] = useState<number>(0);

  useEffect(() => {
    if (location.state && location.state.questions) {
      setQuestions(location.state.questions);
      setTimeCounter(location.state.timeCounter);
    } else {
      navigate("/");
    }

    // eslint-disable-next-line
  }, []);

  const correctQuestions = questions.filter(
    (q) => q.userAnswer !== null && q.userAnswer === q.answer
  );

  const wrongQuestions = questions.filter(
    (q) => q.userAnswer !== null && q.userAnswer !== q.answer
  );

  const emptyQuestions = questions.filter((q) => q.userAnswer === null);

  const hasFailed = correctQuestions.length < questions.length - 5;

  return (
    <Layout>
      <Seo title="Rezultatet" />

      {questions.length > 0 ? (
        <section className={styles.results}>
          <div
            className={`${styles.result} ${
              styles[`result__${hasFailed ? "failed" : "success"}`]
            }`}
          >
            <div className={styles.result__title}>
              {hasFailed ? <XSolidIcon /> : <CheckSolidIcon />}

              <h1>
                {hasFailed ? "Fatekeqesisht nuk kaloni!" : "Suksese kaluat!"}
              </h1>
            </div>

            <div className={styles.illustration}>
              {hasFailed ? (
                <StaticImage
                  src={`../images/illustrations/57.svg`}
                  alt="Illustration"
                  imgStyle={{ objectFit: "contain" }}
                  placeholder="none"
                />
              ) : (
                <StaticImage
                  src={`../images/illustrations/46.svg`}
                  alt="Illustration"
                  imgStyle={{ objectFit: "contain" }}
                  placeholder="none"
                />
              )}
            </div>

            <Button
              size="xl"
              color={hasFailed ? "red" : "green"}
              onClick={() => navigate(-1)}
            >
              <RefreshIcon />
              Provo Perseri
            </Button>
          </div>

          <div className={styles.questions__wrapper}>
            <ul className={styles.question__stats}>
              <li>
                <span>
                  <p>Ju mbaruat provimin ne:</p> <ClockIcon />{" "}
                  {40 - timeCounter} min
                </span>
              </li>
              <li>
                <span>
                  <CheckSolidIcon />
                  <p>Pergjigje te sakta: </p>
                  {correctQuestions.length}
                </span>
                <span>
                  <XSolidIcon />
                  <p>Gabime: </p>
                  {wrongQuestions.length}
                </span>
                <span>
                  <QuestionMarkSolidIcon />
                  <p>Mungojne: </p>
                  {emptyQuestions.length}
                </span>
              </li>
            </ul>

            <ul className={styles.questions}>
              {questions.map((question, index) => {
                const { text, image, answer, userAnswer } = question;

                let type: "correct" | "wrong" | "empty" =
                  userAnswer === null
                    ? "empty"
                    : userAnswer === answer
                    ? "correct"
                    : "wrong";

                const icon = (() => {
                  switch (type) {
                    case "correct":
                      return <CheckSolidIcon />;

                    case "wrong":
                      return <XSolidIcon />;

                    case "empty":
                      return <QuestionMarkSolidIcon />;
                  }
                })();

                return (
                  <li
                    className={`${styles.question} ${
                      styles[`question__${type}`]
                    }`}
                    key={index}
                  >
                    <div>
                      <div className={styles.question__content}>
                        <div className={styles.image}>
                          {image ? (
                            <GatsbyImage
                              image={
                                image.childrenImageSharp[0]
                                  .gatsbyImageData as IGatsbyImageData
                              }
                              alt="Question"
                              imgStyle={{ objectFit: "contain" }}
                            />
                          ) : (
                            <ImageIcon />
                          )}
                        </div>

                        <p>{text}</p>
                      </div>

                      <ul className={styles.question__vote}>
                        <li>
                          <Checkbox
                            checked={!!(userAnswer !== null && answer === true)}
                            id="correct"
                            disabled
                          />
                          <label htmlFor="correct">Sakte</label>
                        </li>

                        <li>
                          <Checkbox
                            checked={
                              !!(userAnswer !== null && answer === false)
                            }
                            id="wrong"
                            disabled
                          />
                          <label htmlFor="wrong">Gabim</label>
                        </li>
                      </ul>
                    </div>

                    <div>{icon}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : (
        <div className={styles.loading}>
          <LoadingIcon />
        </div>
      )}
    </Layout>
  );
};

export default Results;
