//samo primjer kako bi neki bekend otp izgledao

let prodavnice = [
    {
        id: 1,
        naziv: "Voli",
        adresa: "Moskovska  8",
        grad: "Podgorica",
        koordinate: { lat: 42.441, lng: 19.248 }
    },
    {
        id: 2,
        naziv: "Idea",
        adresa: "Cemenca bb",
        grad: "Niksic",
        koordinate: { lat: 42.793, lng: 18.937 }
    }
];

const delay = (rez) => new Promise((resolve) => {
    setTimeout(() => resolve(rez), 500);
});

export function getProdavnice() {
    return delay(prodavnice);
}

export function napraviProdavnicu(prodavnica) {
    const novaProdavnica = {
        prodavnica, id: Date.now()
    };

    prodavnice.push(novaProdavnica);
    return delay(novaProdavnica);
}

export function izbrisiProdavnicu(id) {
    prodavnice = prodavnice.filter((prodavnica) => prodavnica.id !== id);
    return delay();
}

export function updejtujProdavnicu(updatedProdavnica) {
    prodavnice = prodavnice.map((prodavnica) => prodavnica.id === updatedProdavnica.id ? updatedProdavnica : prodavnica);
    return delay(updatedProdavnica);
};