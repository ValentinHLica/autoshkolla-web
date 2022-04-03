import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, navigate } from "gatsby";

import { QuestionList, ExamOptions } from "@interface/utils";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import Context from "../components/Context";

import { Button, Checkbox, Modal } from "@ui";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeOpenIcon,
  ImageIcon,
} from "@icon";

import * as styles from "@styles/pages/exam.module.scss";

const ExamPage: React.FC = () => {
  const { examType, setResultsQuestions, setResultsTimeCounter } =
    useContext(Context);

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
    const res = await fetch("/api/questions");
    const questions = await res.json();
    setQuestions(questions as QuestionList[]);
  };

  useEffect(() => {
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

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

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

  const onFinish = () => {
    setResultsQuestions(questions);
    setResultsTimeCounter(timeCounter);

    navigate("/results");
  };

  const { text, image, answer, userAnswer } = questions[questionIndex];

  return (
    <Layout>
      <Seo title="Provimi" />

      <div className={styles.exam}>
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
                <img src={`/images/${image}.png`} alt="Question" />
              ) : (
                <ImageIcon />
              )}
            </div>

            <div className={styles.question__vote}>
              <ul>
                <li onClick={() => onChange(true)}>
                  <Checkbox
                    checked={!!(userAnswer !== null && userAnswer === true)}
                    id="correct"
                  />
                  <label htmlFor="correct">Sakte</label>
                </li>

                <li onClick={() => onChange(false)}>
                  <Checkbox
                    checked={!!(userAnswer !== null && userAnswer === false)}
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
      </div>

      <Modal visible={modal} setVisible={setModal}>
        <div className={styles.modal__content}>
          <h1 className={styles.modal__title}>Mbaro Testin</h1>

          <img
            className={styles.modal__image}
            src="/illustrations/drawkit-transport-scene-2.svg"
            alt="End"
          />

          <div className={styles.modal__actions}>
            <Button size="xl" onClick={onFinish}>
              Po
            </Button>

            <Button color="red" size="xl" onClick={() => setModal(false)}>
              Jo
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default ExamPage;
