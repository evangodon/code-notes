import styled from 'styled-components';
import { animated as a } from 'react-spring';
import { transparentize } from 'polished';

const Box = styled(a.div)`
  border: 1px solid var(--color-primary);
  background-color: var(--grey-900);
  background-color: ${(props) => transparentize(0.95, props.theme.__color_primary)};
  padding: 2.4rem;
  width: 100%;
`;

export default Box;
