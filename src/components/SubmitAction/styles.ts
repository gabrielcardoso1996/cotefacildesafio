import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: -4rem;
  height: 200px;
`;

export const FormInput = styled.input`
  background-color: var(--gray-500);
  border: solid 1px var(--gray-700);
  border-radius: 0.5rem;
  color: var(--gray-300);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 54px;
`;

export const FormButton = styled.button`
  width: 90px;
  height: 54px;
  border: none;
  background-color: var(--blue-dark);
  border-radius: 0.5rem;
  color: var(--gray-100);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: 0.875rem;
  font-weight: 700;

  svg {
    font-weight: 700;
  }
`;
