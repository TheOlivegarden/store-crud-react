import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastsContext = createContext(null);

export function useToasts() {
  return useContext(ToastsContext);
}

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, variant = 'success', timeout = 3000) => {
    const id = nextId++;
    setToasts((t) => [...t, { id, message, variant }]);
    if (timeout > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, timeout);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastsContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div aria-live="polite" aria-atomic="true" style={{ position: 'fixed', top: 16, right: 16, zIndex: 1055 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {toasts.map((t) => (
            <div key={t.id} className={`toast show text-bg-${t.variant}`} role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body">{t.message}</div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={() => removeToast(t.id)}></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToastsContext.Provider>
  );
}

export default ToastProvider;