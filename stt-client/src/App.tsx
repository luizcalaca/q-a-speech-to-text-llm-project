import React from "react";
import AudioToText from "./AudioToText";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container className="py-5 text-center">
      <h3>Speech to Text and OpenAI API</h3>
      <AudioToText />
    </Container>
  );
}

export default App;
