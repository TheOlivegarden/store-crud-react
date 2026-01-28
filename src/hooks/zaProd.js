import { useEffect, useState } from "react";
import {
    getProdavnice,
    napraviProdavnicu,
    izbrisiProdavnicu,
    updejtujProdavnicu
} from "../services/prodavnicaservis";

export default function useProdavnice() {
    const [prodavnice, setProdavnice] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadProdavnice() {
        setLoading(true);
        setError(null);

        try {
            const data = await getProdavnice();
            setProdavnice(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    async function editProdavnica(prodavnica) {
        setLoading(true);
        await updejtujProdavnicu(prodavnica);
        setProdavnice((prev) =>
            prev.map((p) => (p.id === prodavnica.id ? prodavnica : p))
        );
        setLoading(false);
    }

    async function deleteProdavnica(id) {
        setLoading(true);
        await izbrisiProdavnicu(id);
        setProdavnice((prev) => prev.filter((p) => p.id !== id));
        setLoading(false);
    }

    async function dodajProdavnicu(prodavnica) {
        setLoading(true);
        const novaProdavnica = await napraviProdavnicu(prodavnica);
        setProdavnice((prev) => [...prev, novaProdavnica]);
        setLoading(false);
    }

    useEffect(() => {
        loadProdavnice();
    }, []);

    return {
        prodavnice,
        loading,
        error,
        editProdavnica,
        deleteProdavnica,
        dodajProdavnicu
    };
}