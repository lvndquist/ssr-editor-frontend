import Header from './components/Header';
import Footer from './components/Footer';
import IndexPage from './components/IndexPage';
import DocumentEditor from './components/DocumentEditor';


import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <main className = "main">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/document/:id" element={<DocumentEditor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App