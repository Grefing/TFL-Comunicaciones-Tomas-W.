import { Table } from 'react-bootstrap';
import './tableCalculator.css';

const TableCalculator = ({ symbolPhases }) => {
  
  return (
    <div className="tableContainer align-self-center mx-4">
      <Table className='text-center table-striped' striped bordered >
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Fase (°)</th>
            <th>Amplitud</th>
          </tr>
        </thead>
        <tbody>
          {
            symbolPhases.map((item, i) => (
              <tr key={i}>
                <td>{item.symbol}</td>
                <td>{item.phase}°</td>
                <td>{item.amplitude}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default TableCalculator;
