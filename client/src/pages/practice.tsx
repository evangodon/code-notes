import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import AppContainer from '@components/layout/AppContainer';
import PracticeCard from '@components/PracticeCard';
import { PracticeCard as IPracticeCard } from '@interfaces';

const practiceCards: IPracticeCard[] = [
  {
    id: '1',
    category: 'python',
    title: 'How do you check the length of a list?',
    answer: 'len()',
  },
  {
    id: '2',
    category: 'javascript',
    title: 'What is the prototype?',
    answer: 'len()',
  },
];

const practice: NextPage = () => {
  return (
    <Container>
      <span />
      <PracticeCards>
        {practiceCards.map((card) => (
          <PracticeCard practiceCard={card} key={card.id} />
        ))}
      </PracticeCards>
    </Container>
  );
};

const Container = styled(AppContainer)`
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  justify-items: center;
`;

const PracticeCards = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default practice;
