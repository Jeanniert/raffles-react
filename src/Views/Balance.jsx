import React, {useEffect, useState} from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { sendRequest } from '../functions';
import Table from '../Components/Table';

const Balance = () => {

  const [balances, setBalances]= useState([]);

  const [classLoad,setClassLoad]= useState('');
  const [classTable,setClassTable]= useState('d-none');
  const [rows,setRows]= useState(0);
  const [page,setPage]= useState(1);
  const [pageSize,setPageSize]= useState(0);

  useEffect(()=>{
    getBalance(1);

  },[]);

  const getBalance= async(page)=>{
    
    const res= await sendRequest('GET','','api/raffles/balance?page='+page);
    setBalances(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable('');
    setClassLoad('d-none');
  }

  const goPage= (p)=> {
    setPage(p);
    getBalance(p);

  }

  return (
    <div className='container-md'>
      <div className="card ">
        <div className="card-header">
          Balance
        </div> 

        <div className="card-body">
          <Table col='10' off='1' classLoad={classLoad} classTable={classTable}>
            <table className='table table-striped'>
              <thead>
              <tr>
                  <th>N°</th>
                  <th>Metodo de pago</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
              {balances.map( (row,i) => (
                  <tr key={row.id}>
                    <td>{(i+1)}</td>
                    <td>{row.methodOfPayment}</td>
                    <td>{row.total}</td>
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

export default Balance