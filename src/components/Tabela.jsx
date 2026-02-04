import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITEMS_PER_PAGE = 5;

function Tabela({ prodavnice = [], onEdit, onDelete }) {
  const [currentPage, setTrenStranica] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("naziv");
  const [sortOrder, setSortRedosljed] = useState("asc");

  const filtered = prodavnice.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return ( (p.naziv || "").toLowerCase().includes(q) || (p.grad || "").toLowerCase().includes(q) || (p.adresa || "").toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const A = (a[sortField] || "").toString().toLowerCase();
    const B = (b[sortField] || "").toString().toLowerCase();
    if (A < B) return sortOrder === "asc" ? -1 : 1;
    if (A > B) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProdavnice = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) setTrenStranica(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setTrenStranica(currentPage + 1);
  };

  if (prodavnice.length === 0) {
    return (
      <div className="alert alert-info text-center">
        Nema prodavnica. Dodaj novu prodavnicu!
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div>
        <div className="d-flex mb-3 gap-2">
          <input
            className="form-control"
            placeholder="Pretraži po nazivu, gradu ili adresi..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setTrenStranica(1);
            }}
          />

          <select
            className="form-select"
            value={sortField}
            onChange={(e) => {
              setSortField(e.target.value);
              setTrenStranica(1);
            }}
            style={{ width: 160 }}
          >
            <option value="naziv">Sortiraj po nazivu</option>
            <option value="grad">Sortiraj po gradu</option>
          </select>

          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortRedosljed(e.target.value);
              setTrenStranica(1);
            }}
            style={{ width: 120 }}
          >
            <option value="asc">A→Z</option>
            <option value="desc">Z→A</option>
          </select>
        </div>
        <div className="alert alert-warning text-center">Nema rezultata za zadatu pretragu.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex mb-3 gap-2">
        <input
          className="form-control"
          placeholder="Pretraži po nazivu, gradu ili adresi..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setTrenStranica(1);
          }}
        />

        <select
          className="form-select"
          value={sortField}
          onChange={(e) => {
            setSortField(e.target.value);
            setTrenStranica(1);
          }}
          style={{ width: 160 }}
        >
          <option value="naziv">Sortiraj po nazivu</option>
          <option value="grad">Sortiraj po gradu</option>
        </select>

        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => {
            setSortRedosljed(e.target.value);
            setTrenStranica(1);
          }}
          style={{ width: 120 }}
        >
          <option value="asc">A→Z</option>
          <option value="desc">Z→A</option>
        </select>
      </div>
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