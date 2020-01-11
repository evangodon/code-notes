import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

const routes = {
  home: { route: 'Home', asPath: '/' },
  practice: { route: 'Flash Cards', asPath: '/practice' },
};

const SubHeader = () => {
  const router = useRouter();
  const path = router.pathname.split('/').filter(Boolean);
  const firstPath = path[0] || '';

  return (
    <Container>
      <Routes>
        {Object.values(routes).map((routeData, index) => (
          <Link href={routeData.asPath} key={index}>
            <a>
              <Route active={`/${firstPath}` === routeData.asPath}>
                {routeData.route}
              </Route>
            </a>
          </Link>
        ))}
      </Routes>
    </Container>
  );
};

const Container = styled.nav`
  background-color: var(--grey-900);
  margin-bottom: 6rem;
  border-bottom: 1px solid var(--color-primary);
`;

const Routes = styled.ul`
  margin: 0 auto;
  max-width: var(--app-width);
  font-size: var(--fs-medium);
  display: grid;
  grid-template-columns: repeat(${Object.keys(routes).length}, min-content);
  grid-column-gap: 2.4rem;
  align-items: center;
`;

const Route = styled.li<{ active: boolean }>`
  padding: 1.6rem 0.6rem;
  white-space: nowrap;
  border-bottom: 2px solid
    ${(props) => (props.active ? 'currentColor' : 'transparent')};
`;

export default SubHeader;
