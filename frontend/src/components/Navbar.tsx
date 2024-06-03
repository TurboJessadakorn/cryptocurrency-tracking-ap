import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar: React.FC = () => {
  
  return (
    <NavbarContainer>
      <Logo><img src='http://kryptodian.com/wp-content/uploads/2022/03/Logo-white.svg'></img></Logo>
      <div style={{ display:'flex', justifyContent:'space-between', flex:'1', paddingLeft:'5rem' }}>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
        </NavLinks>
      </div>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  background-color: #27293A;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-family: 'Sans Serif';
`;

const NavLinks = styled.div`
  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Navbar;
