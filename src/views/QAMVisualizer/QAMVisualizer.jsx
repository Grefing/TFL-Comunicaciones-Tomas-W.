import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { create, all } from "mathjs";
import "./QAMVisualizer.css";
import Swal from "sweetalert2";

const math = create(all);

const QAMVisualizer = () => {
  const [binaryInput, setBinaryInput] = useState("");
  const [modulationLevel, setModulationLevel] = useState(4);
  const [plotData, setPlotData] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [constellationData, setConstellationData] = useState([]);
  let [counter, setCounter] = useState(0);

  const calculatePhases = (modulationLevel) => {
    const totalCombinations = Array.from({ length: modulationLevel }, (_, i) =>
      i.toString(2).padStart(Math.log2(modulationLevel), "0")
    );

    const phases = [];
    const amplitudePattern =
      modulationLevel === 4
        ? [4]
        : modulationLevel === 8
        ? [4, 4]
        : modulationLevel === 16
        ? [4, 12]
        : modulationLevel === 32
        ? [4, 12, 16]
        : modulationLevel === 64
        ? [4, 12, 16, 32]
        : [];

    const generateAnglePattern = (numCombinations) =>
      Array.from(
        { length: numCombinations },
        (_, i) => (i * (360 / numCombinations)) % 360
      );

    let index = 0;
    amplitudePattern.forEach((numCombinations, amplitudeLevel) => {
      const amplitude = amplitudeLevel + 1;
      const angles = generateAnglePattern(numCombinations);

      for (let i = 0; i < numCombinations; i++) {
        phases.push({
          symbol: totalCombinations[index],
          phase: angles[i % angles.length],
          amplitude: amplitude,
        });
        index++;
      }
    });

    return phases;
  };

  const generateQAMConstellation = (modulationLevel) => {
    const phases = calculatePhases(modulationLevel);
    return phases.map((p) => ({
      x: parseFloat(
        (p.amplitude * Math.cos((p.phase * Math.PI) / 180)).toFixed(6)
      ),
      y: parseFloat(
        (p.amplitude * Math.sin((p.phase * Math.PI) / 180)).toFixed(6)
      ),
      phase: p.phase,
      symbol: p.symbol,
    }));
  };

  const modulateQAM = () => {
    if (!binaryInput || binaryInput.length % Math.log2(modulationLevel) !== 0) {
      Swal.fire({
        icon: "error",
        title: "La cadena ingresada no es válida",
        text: "Ingrese una cadena válida",
      });
      return;
    }

    const bitsPerSymbol = Math.log2(modulationLevel);
    const constellation = generateQAMConstellation(modulationLevel);
    const symbols = [];
    const annotations = [];
    const shapes = [];

    for (let i = 0; i < binaryInput.length; i += bitsPerSymbol) {
      const chunk = binaryInput.slice(i, i + bitsPerSymbol);
      symbols.push(chunk);
    }

    const frequencyCarrier = 1;
    const baudRate = 100;
    const durationBit = 1 / baudRate;
    const numSamples = symbols.length * baudRate;
    const time = Array.from({ length: numSamples }, (_, i) => i / baudRate);

    const signal = time.map((t, index) => {
      const symbolIndex = Math.floor(index / baudRate);
      if (symbolIndex >= symbols.length) return 0;
      const matchingPoint = constellation.find(
        (p) => p.symbol === symbols[symbolIndex]
      );
      const I = matchingPoint?.x || 0;
      const Q = matchingPoint?.y || 0;

      return (
        I * Math.cos(2 * Math.PI * frequencyCarrier * t) -
        Q * Math.sin(2 * Math.PI * frequencyCarrier * t)
      );
    });

    symbols.forEach((symbol, idx) => {
      const midTime = (idx + 0.5) * durationBit * baudRate;
      const startTime = idx * durationBit * baudRate;

      annotations.push({
        x: midTime,
        y: -1.5,
        text: `${symbol}`,
        showarrow: false,
        font: { size: 12, color: "black" },
      });

      shapes.push({
        type: "line",
        x0: startTime,
        y0: -2,
        x1: startTime,
        y1: 2,
        line: {
          color: "gray",
          width: 1,
          dash: "dot",
        },
      });
    });

    setPlotData([
      {
        x: time,
        y: signal,
        type: "scatter",
        mode: "lines",
        line: { color: "blue" },
        name: "Señal Modulada QAM",
      },
    ]);
    setAnnotations(annotations);
    setShapes(shapes);
    setConstellationData(constellation);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^01]/g, "");
    setBinaryInput(value);
    setCounter(value.length);
  };

  return (
    <section className="mainSection d-flex justify-content-center">
      <div className="text-light align-self-center my-3">
        <div className="d-flex justify-content-center">
          <div className="mx-3 d-flex flex-column">
            <label className="align-self-center">Entrada Binaria:</label>
            <div className="position-relative align-self-center">
              <input
                className="qamInput with-counter mx-1"
                type="text"
                value={binaryInput}
                onChange={handleInputChange}
                placeholder="Ingrese cadena de 0 y 1"
              />
              <h5 className="counter-inside-input">{counter}</h5>
            </div>
          </div>
          <div className="d-flex flex-column">
            <label>Nivel de Modulación:</label>
            <select
              className="mx-2 qamInput with-counter"
              value={modulationLevel}
              onChange={(e) => setModulationLevel(Number(e.target.value))}
            >
              <option value={4}>4-QAM</option>
              <option value={8}>8-QAM</option>
              <option value={16}>16-QAM</option>
              <option value={32}>32-QAM</option>
              <option value={64}>64-QAM</option>
            </select>
          </div>
        </div>
        <div className="mx-3 d-flex justify-content-center mt-3">
          <button className="btnCadena" onClick={modulateQAM}>
            Modular
          </button>
        </div>
        <div className="mt-4 mx-1 d-flex justify-content-center">
          <Plot
          className="plot-container"
            data={plotData}
            layout={{
              title: "Onda Modulada QAM",
              xaxis: { title: "Tiempo (s)" },
              yaxis: { title: "Amplitud" },
              annotations: annotations,
              shapes: shapes,
              autosize: true,
            }}
          />
        </div>
        <div className="mt-4 mx-1 mb-4 d-flex justify-content-center">
          <Plot
            className="plot-container"
            data={[
              {
                x: constellationData.map((p) => p.x),
                y: constellationData.map((p) => p.y),
                mode: "markers+text",
                type: "scatter",
                text: constellationData.map((p) => p.symbol),
                textposition: "top center",
                marker: { size: 10, color: "red" },
                hovertext: constellationData.map(
                  (p) => `Coordenadas: (${p.x.toFixed(2)}, ${p.y.toFixed(2)})<br>Fase: ${p.phase}°`
                ),
                hoverinfo: "text",
              },
            ]}
            layout={{
              title: "Constelación QAM",
              xaxis: { title: "Eje I" },
              yaxis: { title: "Eje Q" },
              autosize: true,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default QAMVisualizer;
