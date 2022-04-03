import React from "react";

import * as styles from "@styles/components/Footer/index.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Autoshkolla. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
