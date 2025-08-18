import { useState } from 'react';
import './App.css';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularIMC = (e) => {
    e.preventDefault();
    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);
    
    if (alturaNum <= 0 || pesoNum <= 0) {
      alert('Por favor, insira valores válidos.');
      return;
    }

    const alturaM = alturaNum / 100;
    const imc = pesoNum / (alturaM * alturaM);
    
    let classificacao = '';
    let cor = '#666';
    
    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
      cor = '#ff9800';
    } else if (imc < 24.9) {
      classificacao = 'Peso normal';
      cor = '#4caf50';
    } else if (imc < 29.9) {
      classificacao = 'Sobrepeso';
      cor = '#ff5722';
    } else if (imc < 34.9) {
      classificacao = 'Obesidade grau 1';
      cor = '#f44336';
    } else if (imc < 39.9) {
      classificacao = 'Obesidade grau 2';
      cor = '#d32f2f';
    } else {
      classificacao = 'Obesidade grau 3';
      cor = '#b71c1c';
    }

    setResultado({ imc: imc.toFixed(2), classificacao, cor });
  };

  const limpar = () => {
    setAltura('');
    setPeso('');
    setResultado(null);
  };

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      
      <form onSubmit={calcularIMC}>
        <div>
          <label>Altura (cm):</label>
          <input
            type="number"
            value={altura}
            onChange={e => setAltura(e.target.value)}
            placeholder="Ex: 175"
            required
          />
        </div>
        
        <div>
          <label>Peso (kg):</label>
          <input
            type="number"
            value={peso}
            onChange={e => setPeso(e.target.value)}
            placeholder="Ex: 70"
            required
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button type="submit">Calcular</button>
          <button type="button" onClick={limpar}>Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <h2>Resultado</h2>
          <p>IMC: {resultado.imc}</p>
          <p style={{ color: resultado.cor }}>
            {resultado.classificacao}
          </p>
        </div>
      )}

      <table className="tabela-imc">
        <thead>
          <tr>
            <th>IMC</th>
            <th>Classificação</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Menor que 18,5</td><td style={{ color: '#ff9800' }}>Abaixo do peso</td></tr>
          <tr><td>18,5 - 24,9</td><td style={{ color: '#4caf50' }}>Peso normal</td></tr>
          <tr><td>25,0 - 29,9</td><td style={{ color: '#ff5722' }}>Sobrepeso</td></tr>
          <tr><td>30,0 - 34,9</td><td style={{ color: '#f44336' }}>Obesidade grau 1</td></tr>
          <tr><td>35,0 - 39,9</td><td style={{ color: '#d32f2f' }}>Obesidade grau 2</td></tr>
          <tr><td>Maior que 40</td><td style={{ color: '#b71c1c' }}>Obesidade grau 3</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
