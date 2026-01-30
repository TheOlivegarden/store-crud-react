import { useEffect, useState } from "react";
import MapPicker from "./Mapa.jsx";

const praznaProdavnica = {
    naziv: "",
    adresa: "",
    grad: "",
    koordinate: { lat: "", lng: "" }
};

export default function ProdModal({
    isOpen,
    onClose,
    onSubmit,
    initialData
}) {
    const [prodavnica, setProdavnica] = useState(praznaProdavnica);

    useEffect(() => {
        if (initialData) {
            setProdavnica({
                ...praznaProdavnica,
                ...initialData,
                koordinate: initialData.koordinate || { lat: "", lng: "" }
            });
        } else {
            setProdavnica(praznaProdavnica);
        }
    }, [initialData]);

    if (!isOpen) return null;

    function handleChange(e) {
        const { name, value } = e.target;

        if (name.startsWith("koordinate.")) {
            const key = name.split(".")[1];

            setProdavnica(prev => ({
                ...prev,
                koordinate: {
                    ...prev.koordinate,
                    [key]: value
                }
            }));
        } else {
            setProdavnica(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }  

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(prodavnica);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-96">
                <h2 className="text-xl mb-4">
                    {initialData ? "Izmijeni Prodavnicu" : "Dodaj Prodavnicu"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="naziv" placeholder="Naziv" value={prodavnica.naziv} onChange={handleChange} className="w-full border p-2" />
                    <input name="adresa" placeholder="Adresa" value={prodavnica.adresa} onChange={handleChange} className="w-full border p-2" />
                    <input name="grad" placeholder="Grad" value={prodavnica.grad} onChange={handleChange} className="w-full border p-2" />
                    <MapPicker
                        edit
                        vrijednost={prodavnica.koordinate.lat !== "" ? prodavnica.koordinate : null }
                        onChange={(koordinate, adresaP) => {
                            setProdavnica((prev) => ({
                                ...prev,
                                koordinate: koordinate,
                                adresa: adresaP?.adresa || prev.adresa,
                                grad: adresaP?.grad || prev.grad
                            }));
                        }}
                    />
                    <input name="koordinate.lat" placeholder="Latituda" value={prodavnica.koordinate.lat} onChange={handleChange} className="w-full border p-2" />
                    <input name="koordinate.lng" placeholder="Longituda" value={prodavnica.koordinate.lng} onChange={handleChange} className="w-full border p-2" />
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-3 py-1 border">
                            Otkaži
                        </button>
                        <button type="submit" className="px-3 py-1 bg-blue-500 text-white">
                            Sačuvaj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}