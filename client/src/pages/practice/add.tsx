import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { NextPage } from 'next';
import Router from 'next/router';
import { ChevronLeft } from 'react-feather';
import gql from 'graphql-tag';
import { withApollo } from '@lib/apollo';
import { useMutation } from '@apollo/react-hooks';
import dynamic from 'next/dynamic';
import { PracticeContainer } from '@pages/practice';
import Box from '@components/layout/Box';
import Input from '@components/forms/Input';
import Button from '@components/Button';
import { PracticeCard, Category } from '@interfaces';
import { ROUTES } from 'constants/routes';
import { ALL_PRACTICE_CARDS_QUERY } from './index';
import { CATEGORIES } from 'constants/index';

const Select = dynamic(() => import('react-select'), { ssr: false });

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

type Option = {
  value: Category;
  label: string;
};

const options: Option[] = CATEGORIES.map((category: Category) => ({
  value: category,
  label: category[0].toUpperCase() + category.slice(1),
}));

const Add: NextPage = () => {
  const [values, setValues] = useState<PracticeCard>({
    id: '',
    question: '',
    category: '',
    answer: '',
  });
  const [createPracticeCard, { data }] = useMutation(ADD_PRACTICE_CARD, {
    update(cache, { data: { createPracticeCard } }) {
      const { practiceCards } = cache.readQuery<{ practiceCards: PracticeCard[] }>({
        query: ALL_PRACTICE_CARDS_QUERY,
      }) || { practiceCards: [] };

      cache.writeQuery({
        query: ALL_PRACTICE_CARDS_QUERY,
        data: { practiceCards: practiceCards.concat([createPracticeCard]) },
      });
    },
  });

  function handleCategoryChange(selectedCategory: Option) {
    setValues({ ...values, category: selectedCategory.value });
  }

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
      <CenterContainer>
        <Header>Add Card</Header>
        <Form>
          <CategoryLabel>Category</CategoryLabel>
          <CategorySelect
            label="Single select"
            value={{ label: values.category, value: values.category }}
            onChange={handleCategoryChange}
            options={options}
            theme={(theme: any) => ({
              ...theme,
              borderRadius: 'var(--border-radius)',
              colors: {
                ...theme.colors,
                primary25: 'var(--grey-200)',
                primary: 'var(--grey-500)',
              },
            })}
          />
          <Input label="Question" onChange={handleChange('question')} required />
          <Input label="Answer" onChange={handleChange('answer')} required />
          <Button
            as="input"
            type="submit"
            onClick={handleSubmit}
            disabled={
              Object.values(values).filter(Boolean).length !==
              Object.keys(values).length - 1
            }
          />
        </Form>
      </CenterContainer>
    </Container>
  );
};

const Container = styled(PracticeContainer)``;

const CategorySelect = styled(Select)`
  width: 100%;
  font-size: var(--fs-small);
  margin-bottom: 1.8rem;
  color: var(--black);
  min-height: 3.8rem;
`;

const CategoryLabel = styled.label`
  margin-bottom: 0.8rem;
  margin-right: auto;
  font-size: var(--fs-small);
`;

const ExitLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-right: auto;
  transition: opacity 0.2s ease;
  height: min-content;
  font-size: var(--fs-small);

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 1.5rem;
    position: relative;
  }
`;

const CenterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.h3`
  font-size: var(--fs-large);
  margin-bottom: 3.6rem;
`;

export default withApollo(Add);
