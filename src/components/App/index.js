// Node modules.
import React, { Component } from "react";
// Relative imports.
import Cryptos from "../Cryptos";
import TopNav from "../TopNav";
import { Wrapper } from "./styles";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <TopNav />
        <Cryptos />
      </Wrapper>
    );
  }
}

export default App;
