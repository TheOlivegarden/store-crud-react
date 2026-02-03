import { useState } from "react";
import Tabela from "../components/Tabela";
import Mapa from "../components/Mapa";
import ProdModal from "../components/ProdModal";
import useProdavnice from "../hooks/zaProd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stranica() {
  const { prodavnice, loading, error, dodajProdavnicu, editProdavnicu, deleteProdavnicu } = useProdavnice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProdavnica, setEditProdavnica] = useState(null);
  const [selMapKoordinate, setSelMapKoordinate] = useState(null);

  const AddKlik = () => {
    setEditProdavnica(null);
    setSelMapKoordinate(null);
    setIsModalOpen(true);
  };

  const EditKlik = (prodavnica) => {
    setEditProdavnica(prodavnica);
    setSelMapKoordinate(prodavnica.koordinate);
    setIsModalOpen(true);
  };

  const DeleteKlik = (id) => {
    if (window.confirm("Sigurno želiš obrisati ovu prodavnicu?")) {
      deleteProdavnicu(id);
    }
  };

  const ModalSubmit = (prodavnica) => {
    if (editProdavnica?.id) {
      editProdavnicu({ ...prodavnica, id: editProdavnica.id });
    } else {
      dodajProdavnicu(prodavnica);
    }
    setIsModalOpen(false);
  };

  const KoordinateSel = (koordinate) => {
    setSelMapKoordinate(koordinate);
  };

  if (error) {
    return <div className="alert alert-danger m-4">Greška pri učitavanju podataka</div>;
  }

  return (
    <div className="min-vh-100" style={{backgroundColor: "#f5f7fa"}}>
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{color: "#2c3e50", fontWeight: "700"}}>Prodavnice</h2>
          <button 
            className="btn btn-primary" 
            onClick={AddKlik} 
            disabled={loading}
            style={{backgroundColor: "#3498db", borderColor: "#3498db"}}
          >
              <FontAwesomeIcon icon="plus" className="me-2" /> 
              Dodaj Prodavnicu
          </button>
        </div>

        {loading && <div className="alert alert-info">Učitavanje...</div>}

        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm" style={{borderTop: "4px solid #3498db", borderRadius: "8px"}}>
              <div className="card-header" style={{backgroundColor: "#ecf0f1", borderBottom: "1px solid #bdc3c7"}}>
                <h5 className="mb-0" style={{color: "#2c3e50"}}>Tabela Prodavnica</h5>
              </div>
              <div className="card-body p-3">
                <Tabela 
                  prodavnice={prodavnice}
                  onEdit={EditKlik} 
                  onDelete={DeleteKlik}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-12">
            <div className="card shadow-sm" style={{borderTop: "4px solid #27ae60", borderRadius: "8px"}}>
              <div className="card-header" style={{backgroundColor: "#ecf0f1", borderBottom: "1px solid #bdc3c7"}}>
                <h5 className="mb-0" style={{color: "#2c3e50"}}>Lokacije Prodavnica</h5>
              </div>
              <div className="card-body p-0">
                <Mapa 
                  selectedCoords={selMapKoordinate}
                  onSelectCoords={KoordinateSel}
                  editMode={isModalOpen}
                  prodavnice={prodavnice}
                  onMarkerClick={EditKlik}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProdModal
        otvoren={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={ModalSubmit}
        initialData={editProdavnica}
      />
    </div>
  );
}

export default Stranica;