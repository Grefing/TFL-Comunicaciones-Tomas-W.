import { useState } from "react";
import "./inicio.css";
import ModalWindow from "../../components/modal/ModalWindow";

const Inicio = () => {

  const [showModal, setShowModal] = useState(false);
  
  return (
    <section className="mainSection d-flex flex-column justify-content-center">
      <div className="align-self-center">
        <h1 className="text-center my-2 title">¿Que es QAM?</h1>
        <img
          src="https://phoenixnap.com/glossary/wp-content/uploads/2022/06/qam-quadrature-amplitude-modulation.jpg"
          alt=""
        />
      </div>

      <div className="align-self-center text-center w-50 mt-4">
        <h5 className="text-light">
          La Modulación de Amplitud en Cuadratura QAM "Quadrature amplitude
          modulation" es un esquema de modulación avanzado muy utilizado en los
          sistemas de comunicación Wi-Fi. Combina la modulación de fase y la
          modulación de amplitud.
        </h5>
      </div>

      <div className="align-self-center w-50 my-2 d-flex flex-column">
        <h2 className="align-self-center title">
          ¿Por qué necesitamos QAM?
        </h2>

        <h5 className="text-light">
          Cuando se utiliza para la modulación de señales digitales Wi-Fi, QAM
          puede alcanzar una velocidad mayor que la modulación de amplitud común
          y la modulación de fase, que sólo admiten dos tipos de símbolos para
          distinguir 0 y 1.
          <ul className="my-3">
            <li>
              Modulación de amplitud: Distingue 0 y 1 modificando la amplitud de
              la portadora.
            </li>
            <li>
              Modulación de fase: Distingue entre 0 y 1 cambiando la fase de la
              portadora. Por ejemplo, la modulación por desplazamiento de fase
              binaria (BPSK) utiliza las fases 0° y 180° para transmitir un
              único bit (0 ó 1) de información. En cambio, QPSK puede codificar
              2 bits por símbolo (00, 01, 10 u 11) mediante las cuatro fases
              siguientes: 0°, 90°, 180° y 270°. De hecho, QPSK es un tipo
              especial de QAM, es decir, 4-QAM.
            </li>
          </ul>
          QAM puede modular más símbolos, y cada símbolo tiene su propia fase y
          amplitud. Por ejemplo, 16-QAM puede modular símbolos en 16 formas de
          onda diferentes, que representan 0000, 0001, etc., como se muestra en
          la siguiente figura. Esto significa que se dispone de un total de 16
          tipos de símbolos, cada uno de los cuales puede transmitir información
          de 4 bits.
        </h5>
      </div>
      <div className="d-flex justify-content-center mb-4">
          <img src="/src/assets/modulationQAM.PNG" className="i" alt="" onClick={() => setShowModal(true)}/>
      </div>
      <ModalWindow show={showModal} onHide={() => setShowModal(false)} imgURL={'/src/assets/modulationQAM.PNG'}/>
    </section>
  );
};

export default Inicio;
