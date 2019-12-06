import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { PracticeCard as IPracticeCard } from '@interfaces';
import PracticeCard from '@components/PracticeCard/PracticeCard';

type Props = {
  loading: boolean;
  practiceCards: IPracticeCard[];
};

/**
 *
 */
const PracticeCards: React.FC<Props> = ({ loading, practiceCards }) => {
  const [hidden, setHidden] = useState<Set<string | -1>>(new Set());
  const router = useRouter();
  const categoryFilter = router.query.category;

  function hideCard(id: string) {
    setHidden(new Set(hidden).add(id));
  }

  if (loading) {
    return <Container />;
  }

  return (
    <Container>
      {practiceCards
        .filter((card: IPracticeCard) => !hidden.has(card.id))
        .filter((card: IPracticeCard) =>
          categoryFilter ? card.category === categoryFilter : true
        )
        .map((card) => (
          <PracticeCard practiceCard={card} key={card.id} hideCard={hideCard} />
        ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export default PracticeCards;
