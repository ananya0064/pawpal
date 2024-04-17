/*import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
                {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}

            </Routes>
        </BrowserRouter>
    )
}

export default App*/

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import OnBoarding from './pages/OnBoarding';

const App = () => {
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        const customCursor = document.createElement('div');
        customCursor.classList.add('custom-cursor');
        document.body.appendChild(customCursor);

        document.addEventListener('mousemove', function(e) {
            customCursor.style.left = e.pageX + 'px';
            customCursor.style.top = e.pageY + 'px';
        });

        const elementsWithCustomCursor = document.querySelectorAll('.show-custom-cursor');
        elementsWithCustomCursor.forEach(function(element) {
            element.addEventListener('mouseenter', function() {
                customCursor.style.display = 'block';
            });
            element.addEventListener('mouseleave', function() {
                customCursor.style.display = 'none';
            });
        });
    }, []); // Run only once when the component mounts

    const authToken = cookies.AuthToken;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {authToken && <Route path="/dashboard" element={<Dashboard />} />}
                {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
