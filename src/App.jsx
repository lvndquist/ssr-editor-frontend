import Header from './components/Header';
import Footer from './components/Footer';
import AddButton from './components/AddButton';
import DocumentList from './components/DocumentList';


function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
          <main className = "main">
            <h2 className = "create-doc">Dokument <AddButton /></h2>
            <DocumentList />
          </main>
        <Footer />
      </div>
    </>
  )
}

export default App