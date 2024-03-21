import React, {useEffect, useState} from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { sendRequest } from '../functions';
import Table from '../Components/Table';

const Participants = () => {

  const [participants, setParticipants]= useState([]);

  const [classLoad,setClassLoad]= useState('');
  const [classTable,setClassTable]= useState('d-none');
  const [rows,setRows]= useState(0);
  const [page,setPage]= useState(1);
  const [pageSize,setPageSize]= useState(0);

  useEffect(()=>{
    getParticipants(1);

  },[]);

  const getParticipants= async(page)=>{
    
    const res= await sendRequest('GET','','api/raffles/index?page='+page);
    setParticipants(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable('');
    setClassLoad('d-none');
  }

  const goPage= (p)=> {
    setPage(p);
    getParticipants(p);

  }

  return (
    <div className='container-md'>
      <div className="card ">
        <div className="card-header">
          Lista de Participantes
        </div>

        <div className="card-body">
          <Table col='10' off='1' classLoad={classLoad} classTable={classTable}>
            <table className='table table-striped'>
              <thead>
              <tr>
                  <th>N°</th>
                  <th>Cedula</th>
                  <th>Nombre Apellido</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Metodo de pago</th>               
                  <th>Numeros</th>
                  <th>Responsable</th>
                  <th>N° Referencia</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
              {participants.map( (row,i) => (
                  <tr key={row.id}>
                    <td>{(i+1)}</td>
                    <td>{row.identification_number}</td>
                    <td>{row.name}</td> 
                    <td>{row.abono}</td>
                    <td>{row.buying_date}</td>
                    <td>{row.methodOfPayment}</td>
                    <td>{JSON.stringify(row.numbers, null, 3)}</td>                                     
                    <td>{row.responsible}</td>
                    <td>{row.reference}</td>
                  </tr>
                ))}            
              </tbody>
            </table>
            <PaginationControl changePage={page=> goPage(page)} next={true} limit={pageSize} page={page} total={rows}/>
          </Table>
          </div>

    </div>
  </div>
  )
}

export default Participants