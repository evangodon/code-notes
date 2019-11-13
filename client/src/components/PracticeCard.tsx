import React, { useState } from 'react';
import styled from 'styled-components';
import { PracticeCard as IPracticeCard } from '@interfaces';
import { DevIcon } from './icons/DevIcons';
import UpperCase from './UpperCase';
import Box from '@components/layout/Box';

type Props = {
  practiceCard: IPracticeCard;
};

type Status = 'CORRECT' | 'INCORRECT' | 'DEFAULT';

const PracticeCard: React.FC<Props> = ({ practiceCard }) => {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<Status>('DEFAULT');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
    setStatus('DEFAULT');
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (answer === practiceCard.answer) {
      setStatus('CORRECT');
    } else {
      setStatus('INCORRECT');
    }
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Category>
          <DevIcon id={practiceCard.category} size={15} />
          <UpperCase text={practiceCard.category} />
        </Category>
        <Header>{practiceCard.question}</Header>
        <AnswerInput
          autoFocus
          value={answer}
          onChange={handleChange}
          status={status}
        />
      </Form>
      {status === 'CORRECT' && <NextButton>Next</NextButton>}
    </Container>
  );
};

const Container = styled(Box)`
  width: 100%;
  max-width: 50rem;
  margin-bottom: 6rem;
`;

const Form = styled.form``;

const Category = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: var(--fs-small);
  padding: 0.4rem 0.8rem;
  margin-bottom: 1.2rem;
  border-radius: 10px;

  svg {
    margin-right: 0.4rem;
  }
`;

const Header = styled.h3`
  font-size: var(--fs-medium);
  font-weight: normal;
  margin-bottom: 2rem;
`;

const borderColor = {
  DEFAULT: 'transparent',
  CORRECT: 'var(--color-green)',
  INCORRECT: 'var(--color-red)',
};

const AnswerInput = styled.input<{ status: Status }>`
  outline: none;
  padding: 0.8rem 1.2rem;
  border-radius: 2px;
  background-color: var(--grey-300);
  font-family: monospace;
  color: var(--grey-900);
  border: 2px solid ${(props) => borderColor[props.status]};
  width: 100%;
`;

const NextButton = styled.button`
  margin-top: 1.8rem;
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius);
`;

export default PracticeCard;
