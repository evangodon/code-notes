import styled from 'styled-components';
import { transparentize } from 'polished';

const Button = styled.button<{ color?: string; type?: string }>`
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid currentColor;
  background-color: ${(props) => transparentize(0.9, props.theme.__color_primary)};
  color: ${(props) => props.color || props.theme.__color_primary};
  padding: 0 2.4rem;
  cursor: pointer;
  transition: all 0.1s;
  font-size: var(--fs-xsmall);
  max-width: 16rem;
  --height: 3.8rem;
  line-height: var(--height);
  height: var(--height);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: var(--border-radius);

  &:hover {
    opacity: 0.9;
  }

  &:active {
    background-color: var(--color-secondary);
  }

  svg {
    stroke-width: 1;
    color: currentColor;
    width: 1.6rem;
    margin-left: 0.6rem;
  }
`;

export default Button;
