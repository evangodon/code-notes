import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { useRouter } from 'next/router';
import { PracticeCard as IPracticeCard } from '@interfaces';
import PracticeCard from '@components/PracticeCard';

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

  const transitions = useTransition(practiceCards || [], (item) => item.id, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-100px,0)' },
  });

  if (loading) {
    return <Container />;
  }

  return (
    <Container>
      {transitions
        .filter(({ item }) => !hidden.has(item.id))
        .filter(({ item }) =>
          categoryFilter ? item.category === categoryFilter : true
        )
        .map(({ item, props, key }) => (
          <PracticeCard
            practiceCard={item}
            key={key}
            hideCard={hideCard}
            style={props}
          />
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
