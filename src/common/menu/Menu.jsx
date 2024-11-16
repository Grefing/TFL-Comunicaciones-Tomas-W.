import { Link, useLocation } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-dark menuContainer d-flex justify-content-between">
      <div className="titleContainer mx-3 d-flex">
        <Link to={"/"}>
          <img src="/src/assets/logo.png" alt="Logo" className="logoMenu" />
        </Link>
      </div>
      <div className="d-flex">
        {currentPath !== "/" && (
          <div className="align-self-center mx-2 linkContainer">
            <Link to={"/"} className="linkCalculator container-fluid">
              Inicio
            </Link>
          </div>
        )}
        {currentPath !== "/calculator" && (
          <div className="align-self-center mx-2 linkContainer">
            <Link to={"/calculator"} className="linkCalculator container-fluid">
              Calculadora
            </Link>
          </div>
        )}
        {currentPath !== "/qam-visualizer" && (
          <div className="align-self-center mx-2 linkContainer">
            <Link
              to={"/qam-visualizer"}
              className="linkCalculator container-fluid"
            >
              ONDAS
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
