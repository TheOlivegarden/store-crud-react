export default function Tabela({ prodavnice }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Adresa</th>
                    <th>Grad</th>
                    <th>Koordinate</th>
                    <th>Akcije</th>
                </tr>
            </thead>

            <tbody>
                {prodavnice.map((prodavnica) => (
                    <tr key={prodavnica.id}>
                        <td>{prodavnica.naziv}</td>
                        <td>{prodavnica.adresa}</td>
                        <td>{prodavnica.grad}</td>
                        <td>{prodavnica.koordinate.lat}, {prodavnica.koordinate.lng}</td>
                        <td>
                            <button onClick={() => onEdit(prodavnica)} className="text-blue-600 mr-2">Izmijeni</button>
                            <button onClick={() => onDelete(prodavnica.id)} className="text-red-600">Obriši</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}