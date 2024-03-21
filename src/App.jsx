import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from './Components/Nav';
import Raffles from "./Views/Raffles";
import Participants from './Views/Participants';
import Balance from "./Views/Balance";


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
          <Route path="/" element={<Raffles />}/>
          <Route path="/participants" element={<Participants />}/>
          <Route path="/balances" element={<Balance />}/>   
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
