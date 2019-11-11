import React, { useState } from "react";
import styled from "styled-components";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const TextEditor: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <Container>
      <CodeMirror
        value={value}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
        onChange={(editor, data, value) => {}}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 50rem;
  font-size: var(--fs-small);
  box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.12);
`;

export default TextEditor;
