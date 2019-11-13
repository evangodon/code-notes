import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import AppContainer from '@components/layout/AppContainer';
import PracticeCard from '@components/PracticeCard';
import Button from '@components/Button';
import { PracticeCard as IPracticeCard } from '@interfaces';

const practiceCards: IPracticeCard[] = [
  {
    id: '1',
    category: 'python',
    question: 'How do you check the length of a list?',
    answer: 'len()',
  },
  {
    id: '2',
    category: 'javascript',
    question: 'What is the prototype?',
    answer: 'len()',
  },
];

const practice: NextPage = () => {
  return (
    <PracticeContainer>
      <span />
      <PracticeCards>
        {practiceCards.map((card) => (
          <PracticeCard practiceCard={card} key={card.id} />
        ))}
      </PracticeCards>
      <Link href="/practice/add">
        <Button as="a">Add Card</Button>
      </Link>
    </PracticeContainer>
  );
};

export const PracticeContainer = styled(AppContainer)`
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  justify-items: center;
`;

const PracticeCards = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default practice;
