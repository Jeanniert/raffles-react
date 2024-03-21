import React, { useEffect,useState } from "react";
import DivInput from "../Components/DivInput";
import { sendRequest } from '../functions';

const Raffles = () => {
  const [name,setName]= useState('');
  const [identification_number, setIdentification_number]= useState('');
  const [abono, setAbono]= useState('');
  const [buying_date,setBuying_date]= useState('');
  const [methodOfPayment ,setMethodOfPayment]= useState('');
  const [responsible,setResponsible]= useState('');
  const [numbers,setNumbers]=  useState([]);
  const [numerosVendidos, setNumerosVendidos] = useState([]);
  const [showAbonoInput, setShowAbonoInput] = useState(false);
  const [reference, setReference]= useState('');



  useEffect(()=>{
    getValidate();

  },[]);

  const getValidate= async()=>{    
    const res= await sendRequest('GET','','api/raffles/validate');
    setNumerosVendidos(res);
  }

  const generarNumeros = () => {
    const numeros = [];
    for (let i = 0; i <= 999; i++) {
      const numeroFormateado = i.toString().padStart(3, "0");
      numeros.push(numeroFormateado);
    }
    return numeros;
  };

  const numerosGenerados = generarNumeros();

  const seleccionarNumero = (numero) => {
    if (numerosVendidos.includes(Number(numero))) {
      // Si el número está vendido, no permitir seleccionarlo
      return;
    }
    if (numbers.includes(numero)) {
      // Si ya está seleccionado, quitarlo de la lista
      setNumbers(numbers.filter((n) => n !== numero));
    } else {
      // Si no está seleccionado, agregarlo a la lista
      setNumbers([...numbers, numero]);
    }
  };

  const numerosSeparadosPorComa = numbers.join(", ");
  const numerosArray = numbers.map(Number);

  const handlePayment = (e) => {
    setMethodOfPayment(e.target.value);
  };

  const  save = async(e)=>{
    e.preventDefault();

    const form= {
      identification_number:identification_number,
      name:name, abono:abono, buying_date:buying_date,
      methodOfPayment:methodOfPayment, responsible:responsible,
      numbers:numerosArray,reference:reference};
    const res= await sendRequest('POST',form,'api/raffles/sales', '/');
    clear();  
};

const clear = () => {
  setIdentification_number('');
  setName('');
  setAbono('');
  setBuying_date('');
  setMethodOfPayment('');
  setResponsible('');
  setNumbers([]);  
};

  return (
    <div className="container-md">
      <div className="card ">
        <div className="card-header">Compra de numeros</div>

        <div className="card-body">
        <form className="row g-3" onSubmit={save}>

          <div className="col-md-3">
            <DivInput type='text' icon='fa fa-solid fa-address-card' value= {identification_number} className='form-control'
                placeholder= 'Cédula de identidad'  required='required'
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[0-9]*$/.test(newValue)) {
                    setIdentification_number(newValue);
                  }
                }}/>
          </div>

          <div className="col-md-3">
            <DivInput type='text' icon='fa fa-solid fa-user' value= {name} className='form-control'
                placeholder= 'Nombre apellido' required='required'
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(newValue)) {
                    setName(newValue);
                  }
                }}/>
          </div>

          <div className="col-md-3">
            <DivInput type='text' icon='fa fa-solid fa-coins' value= {abono} className='form-control'
                placeholder= 'Abono'  required='required'
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[0-9]*$/.test(newValue)) {
                    setAbono(newValue);
                  }
                }} />
          </div>
          
          <div className="col-md-3">
            <DivInput type='date' icon='fa fa-solid fa-calendar-days' value= {buying_date} className='form-control'
              required='required' handleChange={(e)=>setBuying_date(e.target.value)} />
          </div>

          <div className="col-md-3">
            <DivInput type='text' icon='fa fa-solid fa-user-gear' value= {responsible} className='form-control'
                placeholder= 'Responsable'  required='required' 
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(newValue)) {
                    setResponsible(newValue);
                  }
                }} />
          </div>

            <div className="form-group col-md-3">
                <div className='input-group mb-3'>
                    <span className='input-group-text'>
                        <i className='fa fa-solid fa-money-check-dollar'></i>
                    </span>
                <select
                  className="form-control"
                  name="methodOfPayment"
                  onChange={(e) => {
                    handlePayment(e);
                    setShowAbonoInput(e.target.value === "trasnferencia" || e.target.value === "Pago-movil");
                  }}
                >
                  <option value="">Método de pago...</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="Pago-movil">Pago Móvil</option>
                  <option value="trasnferencia">Trasnferencia</option>
                  <option value="divisas">Divisas</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <div className='input-group mb-3'>
                  <span className='input-group-text'>
                      <i className='fa-solid fa-hashtag'></i>
                  </span>
                  <input type='text' placeholder='Números seleccionados' value={numerosSeparadosPorComa} className='form-control'
                  required='required' onChange={(e)=> {
                    setNumbers(e.target.value.split(", "))
                  }} disabled/>
              </div>
            </div>

            {showAbonoInput && (
              <div className="col-md-3">
                <DivInput
                  type="text"
                  icon="fa fa-solid fa-pen-to-square"
                  value={reference}
                  className="form-control"
                  placeholder="N° referencia"
                  required="required"
                  handleChange={(e) => {
                    const newValue = e.target.value;
                    if (/^[0-9]*$/.test(newValue)) {
                      setReference(newValue);
                    }
                  }}
                />
              </div>
            )}


            <div className="form-control-sm col-md-3">
                <button className='btn btn-success btn-sm'>
                  <i className='fa fa-solid fa-handshake'></i>  Comprar
                </button>
                <button className='ms-1 btn btn-secondary btn-sm'
                onClick={clear}>
                  <i className='fa fa-solid fa-trash-can'></i> Limpiar
                </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card text-center">
        <div className="card-header">NUMEROS</div>
        <div className="card-body">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tbody>
              {numerosGenerados.map((numero, index) => (
                <tr key={index}>
                  {numerosGenerados
                    .slice(index * 15, (index + 1) * 15)
                    .map((num, colIndex) => (
                      <td
                        key={colIndex}
                        onClick={() => seleccionarNumero(num)}
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          backgroundColor: numbers.includes(num) ? 'yellow' // Color para números seleccionados
                          : numerosVendidos.includes(Number(num)) ? 'lightgreen' // Color para números vendidos
                          : 'white', // Color predeterminado
                          cursor: numerosVendidos.includes(Number(num)) ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {num}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
}

export default Raffles;
