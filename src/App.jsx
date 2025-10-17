import Header from './components/Header';
import Footer from './components/Footer';
import IndexPage from './components/index/IndexPage';
import DocumentEditor from './components/editor/DocumentEditor';
import DocumentCreator from './components/creator/DocumentCreator';
import Login from './components/index/Login'
import Register from './components/index/Register'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function App() {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
    const [isValid, setIsValid] = useState(false);

    function loginHandle(newAuthToken) {
        console.log("authtoken")
        localStorage.setItem("tokenDate", new Date().toISOString());
        localStorage.setItem("authToken", newAuthToken);
        setAuthToken(newAuthToken);
    }

    function logoutHandle() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenDate");
        setAuthToken(null);
    }

    useEffect(() => {
        if (authToken) {
            const tokenDate = localStorage.getItem("tokenDate");
            if (tokenDate) {
                const now = new Date();
                const saved = new Date(tokenDate);
                const timeElapsed = (now - saved) / (1000 * 60 * 60)

                if (timeElapsed < 24) {
                    setIsValid(true);
                } else {
                    logoutHandle();
                }
            } else {
                logoutHandle();
            }
        } else {
            setIsValid(false);
        }
    }, [authToken]);

    return (
        <>
            <div className='app-container'>
                <Header onLogout={logoutHandle} isValid={isValid}/>
                <main>
                    <Routes>
                        <Route path="/login" element={authToken && isValid ? <Navigate to="/" /> : <Login onLogin={loginHandle}/>}/>
                        <Route path="/register" element={authToken && isValid ? <Navigate to="/" /> : <Register/>}/>
                        <Route path="/" element={authToken && isValid ? <IndexPage/> : <Navigate to="/login"/>}/>
                        <Route path="/document/:id" element={authToken && isValid ? <DocumentEditor/> : <Navigate to="/login"/>}/>
                        <Route path="/create" element={authToken && isValid ? <DocumentCreator/> : <Navigate to="/login"/>}/>
                    </Routes>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default App
