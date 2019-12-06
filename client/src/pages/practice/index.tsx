import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '@lib/apollo';
import AppContainer from '@components/layout/AppContainer';
import PracticeCards from '@components/containers/PracticeCards';
import Categories from '@components/Categories';
import Button from '@components/Button';
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

/**
 * @todo: handle request error
 */
const PracticeHome: NextPage = () => {
  const { loading, error, data } = useQuery(ALL_PRACTICE_CARDS_QUERY);

  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return (
    <PracticeContainer>
      <Categories />
      <PracticeCards
        loading={loading}
        practiceCards={data ? data.practiceCards : []}
      />
      <Link href={ROUTES.PRACTICE.ADD}>
        <AddButton as="a">Add Card</AddButton>
      </Link>
    </PracticeContainer>
  );
};

export const PracticeContainer = styled(AppContainer)`
  display: grid;
  grid-template-columns: 14.5rem 1fr 14.5rem;
`;

const AddButton = styled(Button)``;

export default withApollo(PracticeHome);
