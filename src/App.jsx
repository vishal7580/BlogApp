import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Container, Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <div className='bg-slate-300 h-screen'>
      <Container>
        <div>
          <Header></Header>
            <Outlet /> 
        </div>
        {/* LOGIN, SIGNUP , ADD POST, EDIT POST -> OUTLET */}
        <Footer/>
      </Container>
    </div>
  )
}

export default App
