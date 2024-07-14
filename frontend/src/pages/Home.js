// src/HomePage.js
import React from 'react';
import styled from 'styled-components';
import logo from '../data/photos/rapl-logo.png'; // Adjust the path to your edited image

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 3em;
  margin-top: 20px;
`;

const Logo = styled.img`
  width: 300px; 
  margin-top: 20px;
`;

const HomePage = () => {
  return (
    <Container>
      <Header>RUET Analytical Programming Lab</Header>
      <Logo src={logo} alt="RAPL Logo" />
    </Container>
  );
}

export default HomePage;
