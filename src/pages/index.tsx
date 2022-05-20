import React, { useState } from "react";
import { Link } from "gatsby";

import { ExamOptions } from "@interface/utils";

import Layout from "@components/Layout";
import Seo from "@components/Seo";
import { Button, Checkbox } from "@ui";
import { ClipboardIcon, ClipboardInIcon, ClipboardListIcon } from "@icon";

import * as styles from "@styles/pages/home.module.scss";
import { StaticImage } from "gatsby-plugin-image";

const HomePage: React.FC = () => {
  const [examType, setExamType] = useState<ExamOptions>("normal");

  const options: {
    text: string;
    type: ExamOptions;
    icon: JSX.Element;
  }[] = [
    {
      text: "Test i zgjidhur",
      type: "solved",
      icon: <ClipboardListIcon />,
    },
    {
      text: "Test me ndihme",
      type: "help",
      icon: <ClipboardInIcon />,
    },
    {
      text: "Test normal",
      type: "normal",
      icon: <ClipboardIcon />,
    },
  ];

  return (
    <Layout>
      <Seo />
      <section className={styles.home}>
        <div className={styles.poster}>
          <StaticImage
            src="../images/illustrations/drawkit-transport-scene-13.svg"
            alt="Intro"
            imgStyle={{ objectFit: "contain" }}
          />
        </div>

        <ul className={styles.options}>
          {options.map((options, index) => {
            const { text, type, icon } = options;

            return (
              <li onClick={() => setExamType(type)} key={index}>
                <Checkbox checked={!!(examType && examType === type)} />

                {icon}

                <p>{text}</p>
              </li>
            );
          })}
        </ul>

        <Link
          to={`/exam`}
          state={{
            examType,
          }}
        >
          <Button size="xl">Fillo Provimin</Button>
        </Link>
      </section>
    </Layout>
  );
};

export default HomePage;
