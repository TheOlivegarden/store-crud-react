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

    async function editProdavnicu(prodavnica) {
        setLoading(true);
        try {
            const updated = await updejtujProdavnicu(prodavnica);
            setProdavnice((prev) =>
                prev.map((p) => (p.id === prodavnica.id ? updated : p))
            );
            return updated;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function deleteProdavnicu(id) {
        setLoading(true);
        try {
            await izbrisiProdavnicu(id);
            setProdavnice((prev) => prev.filter((p) => p.id !== id));
            return true;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function dodajProdavnicu(prodavnica) {
        setLoading(true);
        try {
            const novaProdavnica = await napraviProdavnicu(prodavnica);
            setProdavnice((prev) => [...prev, novaProdavnica]);
            return novaProdavnica;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProdavnice();
    }, []);

    return {
        prodavnice,
        loading,
        error,
        editProdavnicu,
        deleteProdavnicu,
        dodajProdavnicu
    };
}