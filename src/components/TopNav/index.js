// Node modules.
import React from "react";
import PropTypes from "prop-types";
// Relative imports.
import { Wrapper } from "./styles";
import Logo from "../../assets/react-svgs/Logo";

const TopNav = () => {
  return (
    <Wrapper>
      <Logo />
      <h1>ATH Diff</h1>
    </Wrapper>
  );
};

export default TopNav;
