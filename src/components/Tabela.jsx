import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProdavnice from "../hooks/zaProd";

function Tabela({ onEdit, onDelete }) {
  const { prodavnice } = useProdavnice();

  return (
    <table>
      <thead>
        <tr>
          <th>Ime</th>
          <th>Grad</th>
          <th>Adresa</th>
          <th>Koordinate</th>
          <th className="text-end">Akcije</th>
        </tr>
      </thead>
      <tbody>
        {prodavnice.map(p => (
          <tr key={p.id}>
            <td>{p.naziv}</td>
            <td>{p.grad}</td>
            <td>{p.adresa}</td>
            <td>{p.koordinate.lat}, {p.koordinate.lng}</td>
            <td className="text-end">
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(p)}>
                <FontAwesomeIcon icon={"pen"} />
              </button>

              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)}>
                <FontAwesomeIcon icon={"trash"} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tabela;