import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CommunityBodyWrapper from './components/body/CommunityBodyWrapper';
import MainBodyWrapper from './components/body/MainBodyWrapper';
import RescueBodyWrapper from './components/body/RescueBodyWrapper';
import LoginContainer from './components/login/Login';
import MainContainer from './components/main/MainContainer';

const App: React.FC = () => {
    return (
        <MainContainer>
            <Routes>
                <Route path="" element={<MainBodyWrapper />} />
                <Route path="/rescue" element={<RescueBodyWrapper />} />
                <Route path="/community" element={<CommunityBodyWrapper />} />
                <Route path="/login" element={<LoginContainer />} />
            </Routes>
        </MainContainer>
        // <MainContainer />
    );
};

export default App;
