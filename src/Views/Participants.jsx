import React, { useEffect, useState,useRef } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { confirmation, sendRequest } from "../functions";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import DivInput from "../Components/DivInput";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
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
  
  const [operation,setOperation]= useState();
  const NameInput= useRef();
  const [title, setTitle] = useState("");
  const [id,setId]= useState('');
  const close= useRef();
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");
  const [rows, setRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    getParticipants(1);
  }, []);

  const getParticipants = async (page) => {
    const res = await sendRequest("GET", "", "api/raffles/index?page=" + page);
    setParticipants(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable("");
    setClassLoad("d-none");
  };

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
  //const numbersArray1 = numbers.split(",").map(Number);

  const createUpdate= async(e)=>{
    e.preventDefault();
    const form= { identification_number:identification_number,name:name, abono:abono, buying_date:buying_date,
                methodOfPayment:methodOfPayment, numbers:numerosArray,responsible:responsible, reference:reference};
    
      const res= await sendRequest('PUT',form,'api/raffles/update/'+id, '');
      
      if (res.status == true) {
        getParticipants(page);
        close.current.click(); 
        console.log(res);
      console.log(form);    
      }
  }



  const handlePayment = (e) => {
    setMethodOfPayment(e.target.value);
  };
  const deletePrticipant= (id, name)=> {
    confirmation(name,'api/raffles/delete/'+id,'participants');
  }

  const openModal= (op,identification_number,name, abono, buying_date,methodOfPayment, numbers,responsible,
                    reference,id)=> {
    clear();
    setOperation(op);
    setId(id);
    
    if (op == 2){
      setTitle("Actualizar participante");
      setIdentification_number(identification_number);
      setName(name);
      setAbono(abono);
      setBuying_date(buying_date);
      setMethodOfPayment(methodOfPayment);
      setResponsible(responsible);
      setReference(reference);
      setNumbers(numbers);  
    }
  }

  const clear = () => {
    setIdentification_number('');
    setName('');
    setAbono('');
    setBuying_date('');
    setMethodOfPayment('');
    setResponsible('');
    setNumbers([]);  
  };

  const goPage = (p) => {
    setPage(p);
    getParticipants(p);
  };

  return (
    <div className="container-md">
      <div className="card ">
        <div className="card-header">Lista de Participantes</div>

        <div className="card-body">
          <Table col="10" off="1" classLoad={classLoad} classTable={classTable}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Cedula</th>
                  <th>Participante</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Metodo de pago</th>
                  <th>Numeros</th>
                  <th>Responsable</th>
                  <th>Referencia</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
  {participants.map((row, i) => {
    // Agregar ceros según la cantidad de dígitos
    const formattedNumbers = row.numbers.map(number => {
      const numString = number.toString();
      const numDigits = numString.length;

      if (numDigits === 1) {
        return `00${numString}`;
      } else if (numDigits === 2) {
        return `0${numString}`;
      } else {
        return numString;
      }
    });

    return (
      <tr key={row.id}>
        <td>{i + 1}</td>
        <td>{row.identification_number}</td>
        <td>{row.name}</td>
        <td>{row.abono}</td>
        <td>{row.buying_date}</td>
        <td>{row.methodOfPayment}</td>
        <td>{JSON.stringify(formattedNumbers, null, 3)}</td>
        <td>{row.responsible}</td>
        <td>{row.reference}</td>
        <td>
          <button
            className='btn btn-warning btn-sm'
            data-bs-toggle='modal'
            data-bs-target='#modalParticipant'
            onClick={() =>
              openModal(
                2,
                row.identification_number,
                row.name,
                row.abono,
                row.buying_date,
                row.methodOfPayment,
                row.numbers,
                row.responsible,
                row.reference,
                row.id
              )
            }
          >
            <i className='fa fa-solid fa-edit'></i>
          </button>

          <button
            className='ms-1 btn btn-danger btn-sm'
            onClick={() => deletePrticipant(row.id,row.name)}
          >
            <i className='fa fa-solid fa-trash'></i>
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

            </table>
            <PaginationControl
              changePage={(page) => goPage(page)}
              next={true}
              limit={pageSize}
              page={page}
              total={rows}
            />
          </Table>
        </div>
      </div>

      <Modal title={title} modal="modalParticipant">
        <div className="modal-body">
          <form onSubmit={createUpdate}>
            
              <DivInput
                type="text"
                icon="fa fa-solid fa-address-card"
                value={identification_number}
                className="form-control"
                placeholder="Cédula de identidad"
                required="required"
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[0-9]*$/.test(newValue)) {
                    setIdentification_number(newValue);
                  }
                }}
              />

              <DivInput
                type="text"
                icon="fa fa-solid fa-user"
                value={name}
                className="form-control"
                placeholder="Nombre apellido"
                required="required"
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(newValue)) {
                    setName(newValue);
                  }
                }}
              />


              <DivInput
                type="text"
                icon="fa fa-solid fa-coins"
                value={abono}
                className="form-control"
                placeholder="Abono"
                required="required"
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[0-9]*$/.test(newValue)) {
                    setAbono(newValue);
                  }
                }}
              />


              <DivInput
                type="date"
                icon="fa fa-solid fa-calendar-days"
                value={buying_date}
                className="form-control"
                required="required"
                handleChange={(e) => setBuying_date(e.target.value)}
              />
              

              <DivInput
                type="text"
                icon="fa fa-solid fa-user-gear"
                value={responsible}
                className="form-control"
                placeholder="Responsable"
                required="required"
                handleChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(newValue)) {
                    setResponsible(newValue);
                  }
                }}
              />

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-solid fa-money-check-dollar"></i>
                </span>
                <select
                  className="form-control"
                  name="methodOfPayment"
                  value={methodOfPayment}
                  onChange={(e) => {
                    handlePayment(e);
                    setShowAbonoInput(
                      e.target.value === "trasnferencia" ||
                        e.target.value === "Pago-movil"
                    );
                  }}
                >
                  <option value="">Método de pago...</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="Pago-movil">Pago Móvil</option>
                  <option value="trasnferencia">Trasnferencia</option>
                  <option value="divisas">Divisas</option>
                </select>
              </div>


              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-hashtag"></i>
                </span>
                <input
                  type="text"
                  placeholder="Números seleccionados"
                  value={numerosSeparadosPorComa}
                  className="form-control"
                  required="required"
                  onChange={(e) => {
                    setNumbers(e.target.value.split(", "));
                  }}
                  
                />
              </div>              

            {showAbonoInput && (
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
            )}

              <button className="btn btn-warning btn-sm">
                <i className="fa fa-solid fa-handshake"></i> Actualizar
              </button>
              <button className="ms-1 btn btn-secondary btn-sm" onClick={clear}>
                <i className="fa fa-solid fa-trash-can"></i> Limpiar
              </button>
          </form>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-dark"
            data-bs-dismiss="modal"
            ref={close}
            hidden
          ></button>
        </div>
      </Modal>
    </div>
  );
};

export default Participants;
