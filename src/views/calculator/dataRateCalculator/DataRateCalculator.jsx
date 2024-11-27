import { Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./dataRateCalculator.css";
import { useEffect, useState } from "react";

const DataRateCalculator = ({ levels }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [dataRate, setDataRate] = useState(null);
  // const [symbolTemp, setSymbolTemp] = useState(0);

  const onSubmit = (data) => {
    if (data.symbolTemp) {
      const symbolTimeInSeconds = data.symbolTemp / 1000;
      const baudios = 1 / symbolTimeInSeconds;
      const dataRateNumber = baudios * Math.log2(levels);
      // setSymbolTemp(data.symbolTemp);
      setDataRate(dataRateNumber);
    }
    reset();
  };

  useEffect(() => {
    setDataRate(null);
  }, [levels]);

  return (
    <div className="mx-3">
      <h3 className="titleDataRateCalculator">Calcular Tasa de información:</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="my-3">
          <Form.Control
            type="number"
            placeholder="Tiempo de símbolo en ms"
            {...register("symbolTemp", {
              required: "El tiempo de símbolo es requerido.",
              valueAsNumber: true, 
              min: {
                value: 0.01, 
                message: "El tiempo de símbolo debe ser mayor a 0.",
              },
            })}
            className={errors.symbolTemp ? "input-error" : ""}
          />
        </InputGroup>
        {errors.symbolTemp && (
          <p className="mx-2" style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.symbolTemp.message}
          </p>
        )}
        <div className="my-3 d-flex justify-content-end">
          <button className="btnCalculate">Calcular</button>
        </div>
      </Form>

      {dataRate !== null && (
        <div className="d-flex justify-content-center">
          {/* <h3 className="text-light">R = <sup>1</sup>&frasl;<sub>{symbolTemp}ms</sub> * log<sub>2</sub>({levels}) = {dataRate}Kbps</h3> */}
          <h3 className="text-light">R = {dataRate}Kbps</h3>
        </div>
      )}
    </div>
  );
};

export default DataRateCalculator;
