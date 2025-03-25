import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
     background-color: #1e3a8a; /* Tailwind's blue-500 */
     display: flex;
     flex-direction: column;
     width: 100vw; /* Ensure it uses the entire viewport width */
     justify-content: space-between;
     padding: 20px;
     box-sizing: border-box;
   `;

const Title = styled.h1`
     color: white;
     font-size: 1.5rem; /* Tailwind's text-2xl */
   `;

const Header = () => {
    return (
        <HeaderContainer >
            <Title>Address Book</Title>
        </HeaderContainer>
    );
};

export default Header;