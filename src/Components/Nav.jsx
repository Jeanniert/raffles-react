import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import storage from '../Storage/storage'
import {sendRequest} from '../functions'
import axios from "axios";

export const show_alerta= (msj, icon)=> {
    Swal.fire({title:msj, icon:icon, buttonsStyling:true});
}

const Nav = () => {

    const go= useNavigate();
    const logout= async()=> {
        const datos = JSON.parse(localStorage.authToken);
        storage.remove('authToken');
        storage.remove('authUser');        
        await axios.get('api/logout', datos);        
        go('/login');
    }

  return (
  

<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
{storage.get('authUser') ? (
  <div className="container-fluid">
    <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="/naykana-dark.png"
          height="60"
          alt="Naykana"
          loading="lazy"
        />
      </a>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/">VENTA</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/participants">PARTICIPANTES</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/balances">BALANCE</a>
        </li>
      </ul>
    </div>
  </div>
  ):''}
</nav>
  )
}

export default Nav