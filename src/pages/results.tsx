import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";

import { QuestionList } from "@interface/utils";

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
                  src={`../images/illustrations/drawkit-transport-scene-10.svg`}
                  alt="Illustration"
                  imgStyle={{ objectFit: "contain" }}
                />
              ) : (
                <StaticImage
                  src={`../images/illustrations/drawkit-transport-scene-3.svg`}
                  alt="Illustration"
                  imgStyle={{ objectFit: "contain" }}
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
                  <strong>Ju mbaruat provimin ne:</strong> <ClockIcon />{" "}
                  {40 - timeCounter} min
                </span>
              </li>
              <li>
                <span>
                  <CheckSolidIcon />
                  <strong>Pergjigje te sakta: </strong>
                  {correctQuestions.length}
                </span>
                <span>
                  <XSolidIcon />
                  <strong>Gabime: </strong>
                  {wrongQuestions.length}
                </span>
                <span>
                  <QuestionMarkSolidIcon />
                  <strong>Mungojne: </strong>
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
                            <img src={`/images/${image}.png`} alt="Question" />
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

                    <div className={styles.icon}>{icon}</div>
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
