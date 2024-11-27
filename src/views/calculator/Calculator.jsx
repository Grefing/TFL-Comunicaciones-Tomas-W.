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
    const nivelesModulation = parseInt(data.modulation);

    if (!isNaN(nivelesModulation)) {
      setLevels(nivelesModulation);
      setBits(Math.log2(nivelesModulation));
    }
  };

  useEffect(() => {
    if (bits > 0) {
      const totalCombinations = generateCombinations(bits);
      const phases = calculatePhases(totalCombinations);
      setSymbolPhases(phases);
    }
  }, [bits]);

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
          <Form.Select
              {...register("modulation", {
                required: "Por favor, selecciona una modulación válida",
                validate: (value) => value !== "0" || "Selecciona una modulación",
              })}
              className={errors.modulation ? "input-error" : ""}
            >
              <option value="0">Selecciona una modulación</option>
              <option value="4">4-QAM</option>
              <option value="8">8-QAM</option>
              <option value="16">16-QAM</option>
              <option value="32">32-QAM</option>
              <option value="64">64-QAM</option>
            </Form.Select>
            <button type="submit" className="btnCadena">
              Enviar
            </button>
          </InputGroup>
          {errors.modulation && (
            <Form.Text className="text-danger mx-2">
              {errors.modulation.message}
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
                <TableCalculator symbolPhases={symbolPhases} />
              </div>

              <div className="d-flex justify-content-center mt-4 flex-wrap">
                <div>
                  <img
                    src={`https://res.cloudinary.com/dwq8jr6pz/image/upload/v1732683627/${levels}qam.png`}
                    alt="imgModulation"
                    className="constellation"
                    onClick={() => setShowModal(true)}
                  />
                </div>

                <div className="mt-3">
                  <DataRateCalculator levels={levels} />
                </div>
              </div>

              <ModalWindow
                show={showModal}
                onHide={() => setShowModal(false)}
                imgURL={`https://res.cloudinary.com/dwq8jr6pz/image/upload/v1732683627/${levels}qam.png`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;
