import './App.css'
import Stranica from './pages/Stranica'
import { ToastProvider } from './components/ToastProvider'

function App() {
  return (
    <ToastProvider>
      <Stranica />
    </ToastProvider>
  );
}

export default App;