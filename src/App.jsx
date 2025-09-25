import Header from './components/Header';
import Footer from './components/Footer';
import IndexPage from './components/index/IndexPage';
import DocumentEditor from './components/editor/DocumentEditor';
import DocumentCreator from './components/creator/DocumentCreator';


import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/document/:id" element={<DocumentEditor />} />
            <Route path="/create" element={<DocumentCreator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App