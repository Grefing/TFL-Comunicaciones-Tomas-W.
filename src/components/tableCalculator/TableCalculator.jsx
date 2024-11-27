import { Table } from 'react-bootstrap';
import './tableCalculator.css';

const TableCalculator = ({ symbolPhases }) => {
  
  return (
    <div className="tableContainer">
      <Table className='text-center table-striped' striped bordered responsive>
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
