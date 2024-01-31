import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminMenu from './components/AdminMenu';


const AppRouter = () => {
return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/AdminMenu" element={<AdminMenu/>}/>
    </Routes>
);
};

export default AppRouter;
