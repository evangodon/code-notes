import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AppContainer from '@components/layout/AppContainer';
import PracticeCard from '@components/PracticeCard';
import Categories from '@components/Categories';
import Button from '@components/Button';
import { PracticeCard as IPracticeCard } from '@interfaces';
import { withApollo } from '@lib/apollo';
import { ROUTES } from 'constants/routes';

export const ALL_PRACTICE_CARDS_QUERY = gql`
  {
    practiceCards {
      id
      category
      question
      answer
    }
  }
`;

const PracticeHome: NextPage = () => {
  const { loading, error, data } = useQuery(ALL_PRACTICE_CARDS_QUERY);

  return (
    <PracticeContainer>
      <Categories />
      <PracticeCards>
        {loading
          ? null
          : data.practiceCards.map((card: IPracticeCard) => (
              <PracticeCard practiceCard={card} key={card.id} />
            ))}
      </PracticeCards>
      <Link href={ROUTES.PRACTICE.ADD}>
        <Button as="a">Add Card</Button>
      </Link>
    </PracticeContainer>
  );
};

export const PracticeContainer = styled(AppContainer)`
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
`;

const PracticeCards = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export default withApollo(PracticeHome);
