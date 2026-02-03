import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITEMS_PER_PAGE = 5;

function Tabela({ prodavnice = [], onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(prodavnice.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProdavnice = prodavnice.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (prodavnice.length === 0) {
    return (
      <div className="alert alert-info text-center">
        Nema prodavnica. Dodaj novu prodavnicu!
      </div>
    );
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>Naziv</th>
              <th>Grad</th>
              <th>Adresa</th>
              <th>Koordinate</th>
              <th className="text-end">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProdavnice.map(p => (
              <tr key={p.id}>
                <td>{p.naziv}</td>
                <td>{p.grad}</td>
                <td>{p.adresa}</td>
                <td className="small">{p.koordinate.lat.toFixed(3)}, {p.koordinate.lng.toFixed(3)}</td>
                <td className="text-end">
                  <button 
                    className="btn btn-sm btn-outline-primary me-2" 
                    onClick={() => onEdit(p)}
                    title="Izmijeni"
                  >
                    <FontAwesomeIcon icon="pen" />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger" 
                    onClick={() => onDelete(p.id)}
                    title="Obriši"
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation" className="d-flex justify-content-between align-items-center">
        <small className="text-muted">Stranica {currentPage} od {totalPages}</small>
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Prethodna
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Sljedeca
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Tabela;