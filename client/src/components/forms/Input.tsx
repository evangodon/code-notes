import React from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ label, onChange }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput onChange={onChange} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  margin-bottom: 2.4rem;
`;

const Label = styled.label`
  font-size: var(--fs-small);
  margin-bottom: 0.8rem;
`;

const StyledInput = styled.input`
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius);
  border: 0;
`;

export default Input;
