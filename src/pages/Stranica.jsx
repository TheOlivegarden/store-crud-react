import Tabela from "../components/Tabela";
import useProdavnice  from "../hooks/zaProd"; 

export default function Stranica() {
    const { prodavnice, loading, error } = useProdavnice();

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Spisak Prodavnica</h1>
            <Tabela prodavnice={prodavnice} />
        </div>
    );
}