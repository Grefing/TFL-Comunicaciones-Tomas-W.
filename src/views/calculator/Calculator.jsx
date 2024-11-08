import { Button, Form, InputGroup } from "react-bootstrap";
import "./calculator.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TableCalculator from "../../components/tableCalculator/TableCalculator";
import ModalWindow from "../../components/modal/ModalWindow";
import DataRateCalculator from "./dataRateCalculator/DataRateCalculator";

const Calculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [levels, setLevels] = useState(0);
  const [bits, setBits] = useState(0);
  const [symbolPhases, setSymbolPhases] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    const cadenaLength = data.cadena.length;
    const calculatedBits = Math.log2(cadenaLength);

    setLevels(cadenaLength);
    setBits(calculatedBits);

    const totalCombinations = generateCombinations(calculatedBits);
    const phases = calculatePhases(totalCombinations);
    setSymbolPhases(phases);
  };

  const isPowerOfTwo = (num) => {
    return [4, 8, 16, 32, 64].includes(num);
  };

  const generateCombinations = (n) => {
    const combinations = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
      const binaryString = i.toString(2).padStart(n, "0");
      combinations.push(binaryString);
    }
    return combinations;
  };

  const calculatePhases = (combinations) => {
    const phases = [];
    const levels = combinations.length;
    let index = 0;

    const amplitudePattern =
      levels === 4
        ? [4]
        : levels === 8
        ? [4, 4]
        : levels === 16
        ? [4, 12]
        : levels === 32
        ? [4, 12, 16]
        : levels === 64
        ? [4, 12, 16, 32]
        : [];

    const generateAnglePattern = (numCombinations) =>
      Array.from(
        { length: numCombinations },
        (_, i) => (i * (360 / numCombinations)) % 360
      );

    amplitudePattern.forEach((numCombinations, amplitudeLevel) => {
      const amplitude = amplitudeLevel + 1;
      const angles = generateAnglePattern(numCombinations);

      for (let i = 0; i < numCombinations; i++) {
        phases.push({
          symbol: combinations[index],
          phase: angles[i % angles.length],
          amplitude: amplitude,
        });
        index++;
      }
    });

    return phases;
  };

  return (
    <section className="mainSection d-flex justify-content-center">
      <div className="levelInputContainer my-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup className="d-flex">
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">4-QAM</option>
              <option value="2">8-QAM</option>
              <option value="3">16-QAM</option>
              <option value="3">32-QAM</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Ingresa la cadena de bits"
              {...register("cadena", {
                required: "La cadena es obligatoria",
                validate: {
                  binary: (value) =>
                    /^[01]+$/.test(value) || "Solo se permiten ingresar 1 y 0",
                  minLength: (value) =>
                    value.length >= 4 ||
                    "La cadena debe tener al menos 4 caracteres",
                  maxLength: (value) =>
                    value.length <= 64 ||
                    "La cadena no puede tener más de 64 caracteres",
                  powerOfTwo: (value) =>
                    isPowerOfTwo(value.length) ||
                    "La longitud debe ser una potencia de 2 y un valor estándar (4, 8, 16, 32, 64)",
                },
              })}
              className={errors.cadena ? "input-error" : ""}
            />
            <button type="submit" className="btnCadena">
              Enviar
            </button>
          </InputGroup>
          {errors.cadena && (
            <Form.Text className="text-danger mx-2">
              {errors.cadena.message}
            </Form.Text>
          )}
        </Form>

        {symbolPhases.length > 0 && (
          <div className="mt-4 text-light d-flex justify-content-center">
            <h1>{levels}-QAM</h1>
          </div>
        )}

        <div>
          {symbolPhases.length > 0 && (
            <div>
              <div>
                <TableCalculator symbolPhases={symbolPhases}></TableCalculator>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <div>
                  <img
                    src={`/src/assets/modulations/${levels}qam.png`}
                    alt="imgModulation"
                    className="constellation"
                    onClick={() => setShowModal(true)}
                  />
                </div>

                <div>
                  <DataRateCalculator levels={levels}></DataRateCalculator>
                </div>
              </div>

              <ModalWindow
                show={showModal}
                onHide={() => setShowModal(false)}
                imgURL={`/src/assets/modulations/${levels}qam.PNG`}
              ></ModalWindow>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;
