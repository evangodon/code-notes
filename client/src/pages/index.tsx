import * as React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Header from "@components/Header";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@components/TextEditor"), {
  ssr: false
});

const IndexPage: NextPage = () => {
  return (
    <>
      <Header />
      <Container>
        <TextEditor />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  max-width: var(--app-width);
  margin: 0 auto;
`;

export default IndexPage;
