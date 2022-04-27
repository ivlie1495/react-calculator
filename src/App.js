import { useState } from 'react';
import './App.css';

const inputs = [ '1', '2', '3' ];
const buttons = [ '+', '-', 'x', '/' ];

function App() {
  const [ result, setResult ] = useState(0);
  const [ error, setError ] = useState(false);
  const [ inputObject, setInputObject ] = useState({});
  const [ calculationNumbers, setCalculationNumbers ] = useState([]);

  const onChangeInput = (id, value) => {
    if (!isNaN(value)) {
      const intValue = value ? parseInt(value) : 0;
      setInputObject({ ...inputObject, [id]: intValue });
    }
  };
  
  const onChangeCheckbox = (id, checked) => {
    if (!checked) {
      const index = calculationNumbers.indexOf(id);
      calculationNumbers.splice(index, 1);
    } else {
      calculationNumbers.push(id)
    }
    
    setCalculationNumbers([ ...calculationNumbers ]);
  };

  const doCalculate = (type) => {
    let total = 0;

    calculationNumbers.sort();
    for (let i = 0; i < calculationNumbers.length; i++) {
      if (i === 0) {
        total = inputObject[calculationNumbers[i]];
        continue;
      }

      if (type === '+') {
        total += inputObject[calculationNumbers[i]];
      } else if (type === '-') {
        total -= inputObject[calculationNumbers[i]];
      } else if (type === 'x') {
        total *= inputObject[calculationNumbers[i]];
      } else {
        total /= inputObject[calculationNumbers[i]];
      }
    }
    
    setResult(total);
  }

  const onClickCalculation = (type) => {
    if (calculationNumbers.length <= 1) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      doCalculate(type);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Calculator</h2>

        {inputs.map((item) => (
          <div key={item} className="container-flex-with-padding">
            <input type="text" onChange={({ target: { value }}) => onChangeInput(item, value)} />
            <input type="checkbox" onChange={({ target: { checked }}) => onChangeCheckbox(item, checked)} />
          </div>
        ))}

        <div className="container-flex-with-padding">
          {buttons.map((item) => (
            <button key={item} onClick={() => onClickCalculation(item)}>{item}</button>  
          ))}
        </div>

        {error && (
          <div className="error-text">
            Input must be filled and need to check which input you want to calculate
          </div>
        )}
        
        <div className="container-flex-with-padding">
          Hasil: {result}
        </div>
      </header>
    </div>
  );
}

export default App;
