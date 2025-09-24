import { useState } from 'react'

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app-container'>
        <Header />
          <main className = "main">
            <h2>Test</h2>
          </main>
        <Footer />
      </div>
    </>
  )
}

export default App
