import styled from 'styled-components';
import { MoreVertical } from 'react-feather';
import Box from '@components/layout/Box';
import Button from '@components/Button';
import { Status } from './PracticeCard';

export const Container = styled(Box)`
  max-width: 50rem;
  margin-bottom: 4.6rem;
  position: relative;
  padding: 0;
  height: 20rem;
  background-color: transparent;
  position: relative;
`;

export const Options = styled(MoreVertical)`
  position: absolute;
  right: 2rem;
  top: 2rem;
  width: 1.6rem;
  cursor: pointer;
`;

export const OptionsMenu = styled.ul`
  position: absolute;
  right: 2rem;
  top: 4.5rem;
  font-size: var(--fs-small);
  background-color: var(--white);
  color: var(--grey-900);
  border-radius: var(--border-radius);

  li {
    cursor: pointer;
    padding: 0.6rem 1.2rem;
  }
  li:hover {
    background-color: var(--grey-200);
  }
`;

export const Side = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 2.4rem;
`;

export const QuestionSide = styled(Side)`
  background-color: var(--grey-900);
`;
export const AnswerSide = styled(Side)`
  display: flex;
  background-color: var(--grey-900);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Category = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: var(--fs-small);
  margin-bottom: 1.2rem;
  border-radius: 10px;

  svg {
    margin-right: 0.4rem;
  }
`;

export const Question = styled.h3`
  font-size: var(--fs-medium);
  font-weight: normal;
  margin-bottom: 2rem;
  line-height: 1.4;
  flex: 1;
`;

export const borderColor: { [index: string]: string | 0 } = {
  DEFAULT: 'transparent',
  CORRECT: 'var(--color-green)',
  INCORRECT: 'var(--color-red)',
  SHOW_ANSWER: 0,
};

export const AnswerInput = styled.input<{ status: Status }>`
  margin-top: auto;
  outline: none;
  padding: 0.8rem 1.2rem;
  border-radius: 2px;
  background-color: var(--grey-300);
  font-family: monospace;
  color: var(--grey-900);
  border: 2px solid ${(props) => borderColor[props.status]};
  width: 100%;
`;

export const AttemptsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

export const Attempts = styled.div``;

export const AttemptDot = styled.span<{ attempt: Status }>`
  display: inline-block;
  --size: 1.6rem;
  width: var(--size);
  height: var(--size);
  background-color: ${({ attempt, theme }) =>
    attempt === 'CORRECT' ? theme.__color_green : theme.__color_red};
  margin-right: 1rem;
  border-radius: var(--border-radius);
`;

export const Answer = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--fs-large);
`;

export const CloseButton = styled(Button)`
  margin-top: auto;
  margin-left: auto;
`;
