import Swal from "sweetalert2";

export const show_alerta= (msj, icon)=> {
    Swal.fire({title:msj, icon:icon, buttonsStyling:true});
}

const Nav = () => {

  return (
  

<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
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
          <a className="nav-link" href="/">Rifa</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/participants">Participantes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/balances">Balance</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Nav