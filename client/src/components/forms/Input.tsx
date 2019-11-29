import React from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ label, onChange, required = false }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput onChange={onChange} required={required} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.4rem;
`;

const Label = styled.label`
  font-size: var(--fs-small);
  margin-bottom: 0.8rem;
`;

const StyledInput = styled.input<{ required: boolean }>`
  padding: 1.2rem;
  border-radius: var(--border-radius);
  border: 0;
  font-size: var(--fs-medium);
`;

export default Input;
