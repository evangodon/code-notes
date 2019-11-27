import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Box from '@components/layout/Box';
import { DevIcon } from '@components/icons/DevIcons';
import { CATEGORIES } from 'constants/index';
import { ROUTES } from 'constants/routes';
import { Category as ICategory } from '@interfaces';

const Categories = () => {
  const router = useRouter();

  function handleClick(category: ICategory | null) {
    const params = new URLSearchParams(window.location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    const queryString = category ? `?${params.toString()}` : '';
    router.replace(`${ROUTES.PRACTICE.ROOT}${queryString}`);
  }

  const categoryFilter = router.query.category;

  return (
    <Container>
      <Header>Categories</Header>
      <ul>
        <>
          {CATEGORIES.map((category, index) => (
            <Category key={index} onClick={() => handleClick(category)}>
              <DevIcon id={category} size={15} />
              <span>{category}</span>
            </Category>
          ))}
          {categoryFilter && (
            <ClearFilter onClick={() => handleClick(null)}>Clear Filter</ClearFilter>
          )}
        </>
      </ul>
    </Container>
  );
};

const Container = styled(Box)`
  height: min-content;
  width: min-content;
`;

const Header = styled.h3`
  font-size: var(--fs-medium);
  margin-bottom: 2rem;
`;

const Category = styled.li`
  font-size: var(--fs-small);
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--gre-100);
  transition: color, filter 0.2s ease;

  svg {
    margin-right: 0.4rem;
    filter: grayscale(0.5);
  }

  &:hover {
    color: var(--white);
    font-weight: bold;
  }

  &:hover svg {
    filter: grayscale(0);
  }
`;

const ClearFilter = styled.li`
  margin-top: 1rem;
  font-size: var(--fs-xsmall);
  text-align: center;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

export default Categories;
