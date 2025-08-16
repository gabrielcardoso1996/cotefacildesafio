import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: var(--gray-700);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  height: 200px;
`;

export const NavigationContainer = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--gray-300);
  min-width: 80px;

  &:hover {
    background-color: var(--gray-600);
    color: var(--gray-100);
    transform: translateY(-2px);
  }

  &.active {
    background-color: var(--blue-dark);
    color: var(--gray-100);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 32px;
    height: 32px;
    filter: brightness(0.8);
    transition: filter 0.2s ease;
  }

  &:hover img,
  &.active img {
    filter: brightness(1);
  }

  span {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    min-width: 60px;
    padding: 0.5rem;
    
    img {
      width: 24px;
      height: 24px;
    }
    
    span {
      font-size: 0.625rem;
    }
  }
`;
