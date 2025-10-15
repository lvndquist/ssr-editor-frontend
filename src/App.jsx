import Header from './components/Header';
import Footer from './components/Footer';
import IndexPage from './components/index/IndexPage';
import DocumentEditor from './components/editor/DocumentEditor';
import DocumentCreator from './components/creator/DocumentCreator';
import Login from './components/index/Login'
import Register from './components/index/Register'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';


function App() {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

    function loginHandle(newAuthToken) {
        localStorage.setItem("authToken", newAuthToken);
        setAuthToken(newAuthToken);
    }

    function logoutHandle() {
        localStorage.removeItem("authToken");
        setAuthToken(null);
    }

    return (
        <BrowserRouter>
            <div className='app-container'>
                <Header />
                <main>
                    <Routes>
                        <Route path="/login" element={authToken ? <Navigate to="/" /> : <Login onLogin={loginHandle}/>}/>
                        <Route path="/register" element={authToken ? <Navigate to="/" /> : <Register/>}/>
                        <Route path="/" element={authToken ? <IndexPage/> : <Navigate to="/login"/>}/>
                        <Route path="/document/:id" element={authToken ? <DocumentEditor/> : <Navigate to="/login"/>}/>
                        <Route path="/create" element={authToken ? <DocumentCreator/> : <Navigate to="/login"/>}/>
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
