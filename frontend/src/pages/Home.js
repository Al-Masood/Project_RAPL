import React from 'react';
import styled from 'styled-components';
import logo from '../data/photos/rapl-logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

const TextBox = styled.div`
  font-size: 19.5px;
  background-color: #112233;
  color: white;
  padding: 20px;
  margin-top: 80px;
  border-radius: 8px;
  max-width: 800px;
  text-align: left;
`;

const HomePage = () => {
  return (
    <Container>
      <Header>RUET Analytical Programming Lab</Header>
      <Logo src={logo} alt="RAPL Logo" />
      <TextBox>
        RAPL, whose elaboration stands for RUET Analytical Programming Lab, has long
        served as a distinguished community for adept problem solvers from RUET where
        brilliant minds engaged in competitive programming, foster collective growth,
        inspiration, and mutual support. RAPL has made its commitment to progress
        together by imparting knowledge, assisting one another, and, importantly,
        igniting inspiration.
      </TextBox>
    </Container>
  );
}

export default HomePage;
