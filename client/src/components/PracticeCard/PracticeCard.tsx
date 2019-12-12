import React, { useState, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { useMutation } from '@apollo/react-hooks';
import { PracticeCard as IPracticeCard } from '@interfaces';
import { DevIcon } from '@components/icons/DevIcons';
import UpperCase from '@components/UpperCase';
import { DELETE_CARD } from './queries';
import { ALL_PRACTICE_CARDS_QUERY } from '@pages/practice/index';
import { useOutsideClick } from '@hooks/useOutsideClick';
import {
  Container,
  QuestionSide,
  AnswerSide,
  Form,
  Category,
  Options,
  OptionsMenu,
  Question,
  AnswerInput,
  AttemptsContainer,
  AttemptDot,
  Attempts,
  Answer,
  CloseButton,
} from './styles';

type Props = {
  practiceCard: IPracticeCard;
  hideCard: (id: string) => void;
};

export type Status = 'DEFAULT' | 'CORRECT' | 'INCORRECT' | 'SHOW_ANSWER';

/**
 * Renders a practice card
 *
 * @param {PracticeCard} practiceCard
 * @param {function} hideCard
 */
const PracticeCard: React.FC<Props> = ({ practiceCard, hideCard }) => {
  const [answer, setAnswer] = useState('');
  let optionsMenuRef = React.useRef<HTMLUListElement>(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  useOutsideClick(optionsMenuRef, () => setOptionsOpen(false));
  const [status, setStatus] = useState<Status>('DEFAULT');
  const [attempts, setAttemps] = useState<Status[]>([]);
  const [deleteCard] = useMutation(DELETE_CARD, {
    update(cache) {
      const { practiceCards } = cache.readQuery({
        query: ALL_PRACTICE_CARDS_QUERY,
      }) || { practiceCards: [] };

      cache.writeQuery({
        query: ALL_PRACTICE_CARDS_QUERY,
        data: {
          practiceCards: practiceCards.filter(
            (card: IPracticeCard) => card.id !== practiceCard.id
          ),
        },
      });
    },
  });

  useEffect(() => {
    if (attempts.length === 5) {
      setStatus('SHOW_ANSWER');
    }
  }, [attempts]);

  function toggleOptionsMenu() {
    setOptionsOpen(!optionsOpen);
  }

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

  const flipped = status === 'SHOW_ANSWER';
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <Container>
      <QuestionSide
        style={{
          visibility: flipped ? 'hidden' : 'visible',
          opacity: opacity.interpolate((o: any) => Number(1 - o)),
          transform,
        }}
      >
        <Form onSubmit={onSubmit}>
          <Category>
            <DevIcon id={practiceCard.category} size={15} />
            <UpperCase text={practiceCard.category} />
          </Category>
          <Options onClick={toggleOptionsMenu} />
          {optionsOpen && (
            <OptionsMenu ref={optionsMenuRef}>
              <li onClick={() => deleteCard({ variables: { id: practiceCard.id } })}>
                Delete
              </li>
            </OptionsMenu>
          )}
          <Question>{practiceCard.question}</Question>
          <AttemptsContainer>
            <Attempts>
              {attempts.map((attempt: Status, index) => (
                <AttemptDot attempt={attempt} key={index} />
              ))}
            </Attempts>
            {status === 'CORRECT' && (
              <CloseButton onClick={handleCloseClick}>Close</CloseButton>
            )}
          </AttemptsContainer>
          <AnswerInput
            autoFocus
            value={answer}
            onChange={handleChange}
            status={status}
          />
        </Form>
      </QuestionSide>
      <AnswerSide
        style={{
          visibility: flipped ? 'visible' : 'hidden',
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      >
        <Answer>{`Answer: ${practiceCard.answer}`}</Answer>
        <CloseButton onClick={handleCloseClick}>Close</CloseButton>
      </AnswerSide>
    </Container>
  );
};

export default PracticeCard;
