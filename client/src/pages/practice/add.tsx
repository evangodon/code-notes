import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { NextPage } from 'next';
import Router from 'next/router';
import { ChevronLeft } from 'react-feather';
import gql from 'graphql-tag';
import { withApollo } from '@lib/apollo';
import { useMutation } from '@apollo/react-hooks';
import { PracticeContainer } from '@pages/practice';
import Box from '@components/layout/Box';
import Input from '@components/forms/Input';
import Button from '@components/Button';
import { PracticeCard } from '@interfaces';
import { ROUTES } from 'constants/routes';
import { ALL_PRACTICE_CARDS_QUERY } from './index';

const ADD_PRACTICE_CARD = gql`
  mutation CreatePracticeCard(
    $category: String!
    $question: String!
    $answer: String
  ) {
    createPracticeCard(category: $category, question: $question, answer: $answer) {
      id
      category
      question
      answer
    }
  }
`;

const add: NextPage = () => {
  const [values, setValues] = useState<PracticeCard>({
    id: -1,
    question: '',
    category: 'javascript',
    answer: '',
  });
  const [createPracticeCard, { data }] = useMutation(ADD_PRACTICE_CARD, {
    update(cache, { data: { createPracticeCard } }) {
      const { practiceCards } = cache.readQuery<{ practiceCards: PracticeCard[] }>({
        query: ALL_PRACTICE_CARDS_QUERY,
      }) || { practiceCards: [] };
      console.log({ data });
      cache.writeQuery({
        query: ALL_PRACTICE_CARDS_QUERY,
        data: { practiceCards: practiceCards.concat([createPracticeCard]) },
      });
    },
  });

  function handleChange(name: keyof PracticeCard) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value });
    };
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    const { id, ...data } = values;
    createPracticeCard({ variables: data });

    Router.push(ROUTES.PRACTICE.ROOT);
  }

  return (
    <Container>
      <Link href="/practice">
        <ExitLink>
          <ChevronLeft />
          <span>Return</span>
        </ExitLink>
      </Link>
      <Form as="form">
        <Header>Add Card</Header>
        <Input label="Question" onChange={handleChange('question')} />
        <Input label="Answer" onChange={handleChange('answer')} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
};

const Container = styled(PracticeContainer)``;

const ExitLink = styled.a`
  display: flex;
  align-items: start;
  margin-right: auto;

  svg {
    position: relative;
    bottom: 2px;
  }
`;

const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.h3`
  font-size: var(--fs-large);
  margin-bottom: 3.6rem;
`;

export default withApollo(add);
