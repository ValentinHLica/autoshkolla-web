import React from "react";

import { Colors, Size } from "@interface/UI/button";

import * as styles from "@styles/components/UI/button.module.scss";

type Props = {
  size?: Size;
  color?: Colors;
  icon?: JSX.Element;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  size = "md",
  color = "blue",
  icon,
  onClick,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[`button__${size}`]} ${
        styles[`button__${color}`]
      }`}
      onClick={onClick}
    >
      {icon} {children}
    </button>
  );
};

export default Button;
