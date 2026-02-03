import { useEffect, useState } from "react";
import Mapa from "./Mapa.jsx";

const praznaProdavnica = {
    naziv: "",
    adresa: "",
    grad: "",
    koordinate: { lat: 42.43, lng: 19.26 }
};

export default function ProdModal({
    otvoren,
    onClose,
    onSubmit,
    initialData
}) {
    const [prodavnica, setProdavnica] = useState(praznaProdavnica);
    const [errors, setGreska] = useState({});

    useEffect(() => {
        if (initialData) {
            setProdavnica({
                ...initialData,
                koordinate: initialData.koordinate || { lat: 42.43, lng: 19.26 }
            });
        } else {
            setProdavnica(praznaProdavnica);
        }
        setGreska({});
    }, [initialData, otvoren]);

    if (!otvoren) return null;

    function Promjena(e) {
        const { name, vrijednost } = e.target;

        if (name.startsWith("koordinate.")) {
            const key = name.split(".")[1];
            setProdavnica(prev => ({
                ...prev,
                koordinate: {
                    ...prev.koordinate,
                    [key]: isNaN(parseFloat(vrijednost)) ? vrijednost : parseFloat(vrijednost)
                }
            }));
        } else {
            setProdavnica(prev => ({
                ...prev,
                [name]: vrijednost
            }));
        }
        if (errors[name]) {
            setGreska(prev => ({ ...prev, [name]: "" }));
        }
    }  

    function validacijaForme() {
        const novaGreska = {};
        if (!prodavnica.naziv.trim()) novaGreska.naziv = "Naziv je obavezan";
        if (!prodavnica.adresa.trim()) novaGreska.adresa = "Adresa je obavezna";
        if (!prodavnica.grad.trim()) novaGreska.grad = "Grad je obavezan";
        if (!prodavnica.koordinate.lat) novaGreska.lat = "Latituda je obavezna";
        if (!prodavnica.koordinate.lng) novaGreska.lng = "Longituda je obavezna";
        return novaGreska;
    }

    function Submit(e) {
        e.preventDefault();
        const novaGreska = validacijaForme();
        if (Object.keys(novaGreska).length > 0) {
            setGreska(novaGreska);
            return;
        }
        onSubmit(prodavnica);
        onClose();
    }

    return (
        <div className="modal show d-block" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {initialData ? "Izmijeni Prodavnicu" : "Dodaj Novu Prodavnicu"}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={Submit}>
                            <div className="mb-3">
                                <label className="form-label">Naziv</label>
                                <input 
                                    type="text"
                                    name="naziv" 
                                    placeholder="Unesite naziv prodavnice" 
                                    value={prodavnica.naziv} 
                                    onChange={Promjena} 
                                    className={`form-control ${errors.naziv ? 'is-invalid' : ''}`}
                                />
                                {errors.naziv && <div className="invalid-feedback">{errors.naziv}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Adresa</label>
                                <input 
                                    type="text"
                                    name="adresa" 
                                    placeholder="Unesite adresu" 
                                    value={prodavnica.adresa} 
                                    onChange={Promjena} 
                                    className={`form-control ${errors.adresa ? 'is-invalid' : ''}`}
                                />
                                {errors.adresa && <div className="invalid-feedback">{errors.adresa}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Grad</label>
                                <input 
                                    type="text"
                                    name="grad" 
                                    placeholder="Unesite grad" 
                                    value={prodavnica.grad} 
                                    onChange={Promjena} 
                                    className={`form-control ${errors.grad ? 'is-invalid' : ''}`}
                                />
                                {errors.grad && <div className="invalid-feedback">{errors.grad}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Klikni na mapu da odabereš lokaciju</label>
                                <div className="border rounded" style={{height: "300px"}}>
                                    <Mapa 
                                        selectedCoords={prodavnica.koordinate}
                                        onSelectCoords={(coords) => {
                                            setProdavnica(prev => ({
                                                ...prev,
                                                koordinate: coords
                                            }));
                                        }}
                                        editMode={true}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Latituda</label>
                                    <input 
                                        type="number"
                                        name="koordinate.lat" 
                                        placeholder="Latituda" 
                                        value={prodavnica.koordinate.lat} 
                                        onChange={Promjena} 
                                        step="0.0001"
                                        className={`form-control ${errors.lat ? 'is-invalid' : ''}`}
                                    />
                                    {errors.lat && <div className="invalid-feedback">{errors.lat}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Longituda</label>
                                    <input 
                                        type="number"
                                        name="koordinate.lng" 
                                        placeholder="Longituda" 
                                        value={prodavnica.koordinate.lng} 
                                        onChange={Promjena} 
                                        step="0.0001"
                                        className={`form-control ${errors.lng ? 'is-invalid' : ''}`}
                                    />
                                    {errors.lng && <div className="invalid-feedback">{errors.lng}</div>}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Otkaži
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {initialData ? "Sačuvaj Izmjene" : "Dodaj Prodavnicu"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}