import React, { Fragment, useEffect, useState } from "react";
import { graphql, Link } from "gatsby";

import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
  StaticImage,
} from "gatsby-plugin-image";

import { randomQuestions } from "@utils/helper";
import { ExamOptions, Question, QuestionList } from "@interface/utils";

import Layout from "@components/Layout";
import Seo from "@components/Seo";

import { Button, Checkbox, Modal } from "@ui";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeOpenIcon,
  ImageIcon,
  LoadingIcon,
} from "@icon";

import * as styles from "@styles/pages/exam.module.scss";

type Props = {
  location: {
    state: {
      examType: ExamOptions;
    } | null;
  };
  data: {
    dataYaml: {
      noImage: Question[];
      withImage: Question[];
    };
  };
};

const ExamPage: React.FC<Props> = ({ location, data }) => {
  const [examType, setExamType] = useState<ExamOptions>("normal");
  const [questions, setQuestions] = useState<QuestionList[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [timeCounter, setTimeCounter] = useState<number>(40);
  const [modal, setModal] = useState<boolean>(false);

  const nextHandler = () => {
    if (questionIndex !== questions.length - 1) {
      setQuestionIndex((prevState) => prevState + 1);
    } else {
      setModal(true);
    }
  };

  const previousHandler = () =>
    setQuestionIndex((prevState) =>
      prevState !== 0 ? prevState - 1 : prevState
    );

  const fetchQuestions = async () => {
    try {
      const selectedQuestions = randomQuestions(data.dataYaml).map(
        (e: Question) => {
          return {
            ...e,
            userAnswer:
              location &&
              location.state &&
              location.state.examType &&
              location.state.examType === "solved"
                ? e.answer
                : null,
          } as Question;
        }
      );

      setQuestions(selectedQuestions);
    } catch (error) {}
  };

  useEffect(() => {
    setExamType(
      location && location.state && location.state.examType
        ? location.state.examType
        : "normal"
    );

    fetchQuestions();

    const timer = setInterval(() => {
      setTimeCounter((prevState) =>
        prevState !== 1 ? prevState - 1 : prevState
      );
    }, 60000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line
  }, []);

  const onChange = (state: boolean) => {
    setQuestions((prevState) =>
      prevState.map((item, index) => {
        if (index === questionIndex) {
          return {
            ...item,
            userAnswer: state,
          };
        }

        return item;
      })
    );
  };

  return (
    <Layout>
      <Seo title="Provimi" />

      {questions.length > 0 ? (
        <Fragment>
          {(() => {
            const { text, image, answer, userAnswer } =
              questions[questionIndex];

            return (
              <section className={styles.exam}>
                <div className={styles.exam__info}>
                  <p>
                    Pyetja {questionIndex + 1} nga {questions.length}
                  </p>

                  <p>{timeCounter} min</p>
                </div>

                <div className={styles.question}>
                  <h3 className={styles.question__text}>{text}</h3>

                  <div className={styles.question__details}>
                    <div className={styles.question__image}>
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

                    <div className={styles.question__vote}>
                      <ul>
                        <li onClick={() => onChange(true)}>
                          <Checkbox
                            checked={
                              !!(userAnswer !== null && userAnswer === true)
                            }
                            id="correct"
                          />
                          <label htmlFor="correct">Sakte</label>
                        </li>

                        <li onClick={() => onChange(false)}>
                          <Checkbox
                            checked={
                              !!(userAnswer !== null && userAnswer === false)
                            }
                            id="wrong"
                          />
                          <label htmlFor="wrong">Gabim</label>
                        </li>
                      </ul>

                      {examType === "help" && (
                        <Button onClick={() => onChange(answer)}>
                          <EyeOpenIcon />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.questions__navigation}>
                  <ul className={styles.pagination}>
                    {questions.map((_, index) => (
                      <li
                        onClick={() => setQuestionIndex(index)}
                        key={index}
                        className={`${styles.pagination__item} ${
                          index === questionIndex
                            ? styles.pagination__item__selected
                            : ""
                        } ${
                          questions[index].userAnswer !== null
                            ? styles.pagination__item__answered
                            : ""
                        }`}
                      >
                        {index + 1}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.navigation__arrows}>
                    <Button size="xl" onClick={previousHandler}>
                      <ChevronLeftIcon />
                    </Button>

                    <Button size="xl" onClick={nextHandler}>
                      {questionIndex === questions.length - 1 ? (
                        "Mbaro"
                      ) : (
                        <>
                          <ChevronRightIcon />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </section>
            );
          })()}

          <Modal visible={modal} setVisible={setModal}>
            <div className={styles.modal__content}>
              <h1 className={styles.modal__title}>Mbaro Testin</h1>

              <StaticImage
                className={styles.modal__image}
                src="../images/illustrations/7.svg"
                alt="End"
                imgStyle={{ objectFit: "contain" }}
                placeholder="none"
              />

              <div className={styles.modal__actions}>
                <Link to="/results" state={{ questions, timeCounter }}>
                  <Button size="xl">Po</Button>
                </Link>

                <Button color="red" size="xl" onClick={() => setModal(false)}>
                  Jo
                </Button>
              </div>
            </div>
          </Modal>
        </Fragment>
      ) : (
        <div className={styles.loading}>
          <LoadingIcon />
        </div>
      )}
    </Layout>
  );
};

export const query = graphql`
  {
    dataYaml {
      noImage {
        answer
        text
      }
      withImage {
        image {
          childrenImageSharp {
            gatsbyImageData(width: 200)
          }
        }
        text
        answer
      }
    }
  }
`;

export default ExamPage;
