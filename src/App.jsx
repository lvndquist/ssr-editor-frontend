import Header from './components/Header';
import Footer from './components/Footer';
import IndexPage from './components/index/IndexPage';
import DocumentEditor from './components/editor/DocumentEditor';
import DocumentCreator from './components/creator/DocumentCreator';
import AddButton from './AddButton';
import DocumentList from './DocumentList';
import Login from './components/index/Login'
import Register from './components/index/Register'

import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';


function App() {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
    const [register, setRegister] = useState(false);

    function loginHandle(newAuthToken) {
        localStorage.setItem("authToken", newAuthToken);
        setAuthToken(newAuthToken);
    }

    function logoutHandle() {
        localStorage.removeItem("authToken");
        setAuthToken(null);
    }

    return (
        <div className='app-container'>
            <Header />
            <main>
            {token ? (
                <>
                    <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/document/:id" element={<DocumentEditor />} />
                        <Route path="/create" element={<DocumentCreator />} />
                    </Routes>

                    <div className='index-container'>
                        <h2 className = "create-doc">Dokument <AddButton /></h2>
                        <DocumentList />
                    </div>
                </>
            ) : register ? (
                <>
                    <Register onRegister={() => setRegister(false)} />
                </>
            ) : (
                <>
                    <Login onLogin={loginHandle}/>
                </>
            )}

            </main>
            <Footer />
        </div>
    )
}

export default App
