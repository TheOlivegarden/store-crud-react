export default function Tabela({ prodavnice }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
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
                        <td>{prodavnica.id}</td>
                        <td>{prodavnica.naziv}</td>
                        <td>{prodavnica.adresa}</td>
                        <td>{prodavnica.grad}</td>
                        <td>{prodavnica.koordinate.lat}, {prodavnica.koordinate.lng}</td>
                        <td>
                            <button>Izmijeni</button>
                            <button>Obriši</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}