import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { NextPage } from 'next';
import { ChevronLeft } from 'react-feather';
import { PracticeContainer } from '@pages/practice';
import Box from '@components/layout/Box';
import Input from '@components/forms/Input';
import Button from '@components/Button';
import { PracticeCard } from '@interfaces';

const add: NextPage = () => {
  const [values, setValues] = useState<PracticeCard>({
    id: -1,
    question: '',
    category: 'javascript',
    answer: '',
  });

  function handleChange(name: keyof PracticeCard) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value });
    };
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    console.log('Create new card', values);
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

export default add;
