import { Container, Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <div className='bg-slate-300 h-screen'>
      <Container>
        <Header></Header>
          <main className='overflow-auto no-scrollbar'>
              <Outlet /> 
          </main>
        {/* LOGIN, SIGNUP , ADD POST -> OUTLET */}
        <Footer/>
      </Container>
    </div>
  )
}

export default App
