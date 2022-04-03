import React from "react";
import { Link } from "gatsby";

import { LogoIcon } from "@icon";

import * as styles from "@styles/components/Header/index.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <LogoIcon />

          <h2>Autoshkolla</h2>
        </div>
      </Link>
    </header>
  );
};

export default Header;
