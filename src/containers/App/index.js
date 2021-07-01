// Node modules.
import React, { Component } from "react";
// Relative imports.
import TopNav from "../../components/TopNav";
import { Wrapper } from "./styles";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <TopNav />
      </Wrapper>
    );
  }
}

export default App;
