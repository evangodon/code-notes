import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PracticeCard as IPracticeCard } from '@interfaces';
import { DevIcon } from './icons/DevIcons';
import UpperCase from './UpperCase';
import Box from '@components/layout/Box';
import Button from '@components/Button';

type Props = {
  practiceCard: IPracticeCard;
  hideCard: (id: string) => void;
};

type Status = 'DEFAULT' | 'CORRECT' | 'INCORRECT' | 'SHOW_ANSWER';

/**
 */
const PracticeCard: React.FC<Props> = ({ practiceCard, hideCard }) => {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<Status>('DEFAULT');
  const [attempts, setAttemps] = useState<Status[]>([]);

  useEffect(() => {
    if (attempts.length === 5) {
      setStatus('SHOW_ANSWER');
    }
  }, [attempts]);

  function handleCloseClick() {
    hideCard(String(practiceCard.id));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
    setStatus('DEFAULT');
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (answer === practiceCard.answer) {
      setStatus('CORRECT');
      setAttemps([...attempts, 'CORRECT']);
    } else {
      setStatus('INCORRECT');
      setAttemps([...attempts, 'INCORRECT']);
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
        {status === 'SHOW_ANSWER' ? (
          <span>{`Answer: ${practiceCard.answer}`}</span>
        ) : (
          <AnswerInput
            autoFocus
            value={answer}
            onChange={handleChange}
            status={status}
          />
        )}
      </Form>
      <Bottom>
        <Attempts>
          {attempts.map((attempt: Status, index) => (
            <AttemptDot attempt={attempt} key={index} />
          ))}
        </Attempts>
        {(status === 'CORRECT' || status === 'SHOW_ANSWER') && (
          <CloseButton onClick={handleCloseClick}>Close</CloseButton>
        )}
      </Bottom>
    </Container>
  );
};

const Container = styled(Box)`
  max-width: 50rem;
  margin-bottom: 4.6rem;
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
  line-height: 1.4;
`;

const borderColor = {
  DEFAULT: 'transparent',
  CORRECT: 'var(--color-green)',
  INCORRECT: 'var(--color-red)',
  SHOW_ANSWER: 0,
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

const Bottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.8rem;
`;

const Attempts = styled.div``;

const AttemptDot = styled.span<{ attempt: Status }>`
  display: inline-block;
  --size: 1.6rem;
  width: var(--size);
  height: var(--size);
  background-color: ${({ attempt, theme }) =>
    attempt === 'CORRECT' ? theme.__color_green : theme.__color_red};
  margin-right: 1rem;
  border-radius: var(--border-radius);
`;

const CloseButton = styled(Button)`
  margin-left: auto;
`;

export default PracticeCard;
