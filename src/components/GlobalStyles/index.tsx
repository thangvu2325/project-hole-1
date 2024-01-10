import { FunctionComponent, ReactNode } from "react";
import "./GlobalStyles.css";
interface GlobalStylesProps {
  children: ReactNode;
}

const GlobalStyles: FunctionComponent<GlobalStylesProps> = ({ children }) => {
  return children;
};

export default GlobalStyles;
