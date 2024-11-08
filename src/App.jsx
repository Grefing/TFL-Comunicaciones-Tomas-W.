import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './common/footer/Footer'
import Menu from "./common/menu/Menu";
import Inicio from "./views/inicio/Inicio";
import Eror404 from "./views/error/Error404";
import Calculator from "./views/calculator/Calculator"

function App() {

  return (
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route exact path="/" element={<Inicio></Inicio>}></Route>
        <Route exact path='*' element={<Eror404></Eror404>}></Route>
        <Route exact path="/calculator" element={<Calculator></Calculator>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
