import Tabela from "../components/Tabela";
import Mapa from "../components/Mapa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stranica() {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Prodavnice</h3>
        <button className="btn btn-primary">
            <FontAwesomeIcon icon="plus" className="me-2" /> 
            Dodaj Prodavnicu
        </button>
      </div>

      <div className="row">
        <div className="col-md-7">
          <Tabela />
        </div>
        <div className="col-md-5">
          <Mapa />
        </div>
      </div>
    </div>
  );
}

export default Stranica;