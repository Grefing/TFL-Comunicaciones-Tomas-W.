import { Link, useLocation } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-dark menuContainer d-flex justify-content-between">
      <div className="titleContainer mx-3 d-flex">
        <Link to={"/"}>
          <img src="/src/assets/logo.png" alt="" className="logoMenu" />
        </Link>
      </div>
      {currentPath !== "/calculator" ? (
        <div className="align-self-center mx-4 linkContainer">
          <Link to={"/calculator"} className="linkCalculator container-fluid">
            Calculadora
          </Link>
        </div>
      ) : (
        <div className="align-self-center mx-4 linkContainer">
          <Link to={"/"} className="linkCalculator container-fluid">
            Inicio
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
