import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  text-transform: uppercase;
`;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export default function Button(
  props: ButtonProps
): React.ReactElement<ButtonProps> {
  const { children } = props;
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  );
}
