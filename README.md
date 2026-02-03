# CRUD Aplikacija za Upravljanje Prodavnicama

Kompletan React CRUD sistem za upravljanje maloprodajnim lokacijama sa mapom, tabelom i paginacijom.

## Tehnologije

- **React 19** - Frontend framework
- **Vite** - Build tool
- **Leaflet** - Mapa komponenta
- **Bootstrap 5** - CSS framework
- **FontAwesome 7** - Icon library

### Zahtjevi
- Node.js 16+

### Instalacija

```bash
git clone <repo-url>
cd crud-projekat
npm install
```

### Pokretanje

```bash
npm run dev
npm run build
npm run preview
npm lint
```

Aplikacija će biti dostupna na `http://localhost:5173`

## Struktura Projekta

```
src/
├── components/
│   ├── Tabela.jsx        # Tabela sa paginacijom
│   ├── Mapa.jsx          # Interaktivna mapa
│   └── ProdModal.jsx     # Modal forma
├── hooks/
│   └── zaProd.js         # Custom hook za CRUD
├── services/
│   └── prodavnicaservis.js # Mock API
├── pages/
│   └── Stranica.jsx      # Glavna stranica
└── App.jsx
```