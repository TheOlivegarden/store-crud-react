import Tabela from "../components/Tabela";
import useProdavnice  from "../hooks/zaProd";
import ProdModal from "../components/ProdModal";
import { useState } from "react";

export default function Stranica() {
    const { prodavnice, loading, error, dodajProdavnicu, editProdavnicu, deleteProdavnicu } = useProdavnice();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProdavnica, setSelectedProdavnica] = useState(null);

    function handleAdd() {
        setSelectedProdavnica(null);
        setIsModalOpen(true);
    }

    function handleChange(prodavnica) {
        setSelectedProdavnica(prodavnica);
        setIsModalOpen(true);
    }

    function handleSubmit(prodavnica) {
        if (prodavnica.id) {
            editProdavnica(prodavnica);
        } else {
            dodajProdavnica(prodavnica);
        }
    }

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Prodavnice</h1>
                <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2">
                    Dodaj Prodavnicu
                </button>
            </div>

            <Tabela prodavnice={prodavnice} onChange={handleChange} onDelete={deleteProdavnicu} />

            <ProdModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                prodavnica={selectedProdavnica}
            />
        </div>
    );
}