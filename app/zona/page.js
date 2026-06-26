'use client';

import { useState, useEffect } from 'react';
import styles from '../zona/style.module.css';

export default function ZonaCrud() {
  const [zonas, setZonas] = useState([]);
  const [nombreZona, setNombreZona] = useState('');
  const [buscar, setBuscar] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const fetchZonas = async (texto = '') => {
    try {
      const url = texto
        ? `/api/zona?buscar=${encodeURIComponent(texto)}`
        : '/api/zona';

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) {
        setZonas(data);
      } else {
        setZonas([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchZonas();
  }, []);

  const buscarZona = (e) => {
    const texto = e.target.value;
    setBuscar(texto);
    fetchZonas(texto);
  };

  const prepararEdicion = (zona) => {
    setNombreZona(zona.ZONA_COLEGIO_GRADUACION_MEDIA);
    setEditandoId(zona.Id_zona);
  };

  const guardarZona = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await fetch(`/api/zona/${editandoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ZONA_COLEGIO_GRADUACION_MEDIA: nombreZona
          })
        });

        setEditandoId(null);
      } else {
        await fetch('/api/zona', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ZONA_COLEGIO_GRADUACION_MEDIA: nombreZona
          })
        });
      }

      setNombreZona('');
      setBuscar('');
      fetchZonas();
    } catch (error) {
      console.error(error);
    }
  };

  const borrarZona = async (id) => {
    try {
      await fetch(`/api/zona/${id}`, {
        method: 'DELETE'
      });

      fetchZonas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gestión de Zonas</h1>

      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar zona..."
          value={buscar}
          onChange={buscarZona}
        />

        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setBuscar('');
            fetchZonas();
          }}
        >
          Mostrar todas
        </button>
      </div>

      <form onSubmit={guardarZona} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nombre de la zona"
          value={nombreZona}
          onChange={(e) => setNombreZona(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          {editandoId ? 'Actualizar Zona' : 'Crear Zona'}
        </button>
      </form>

      <div>
        {zonas.length > 0 ? (
          zonas.map((zona) => (
            <div key={zona.Id_zona} className={styles.card}>
              <strong>ID: {zona.Id_zona}</strong> - {zona.ZONA_COLEGIO_GRADUACION_MEDIA}

              <div style={{ marginTop: '10px' }}>
                <button
                  className={styles.button}
                  onClick={() => prepararEdicion(zona)}
                >
                  Editar
                </button>

                <button
                  className={`${styles.button} ${styles.buttonDelete}`}
                  onClick={() => borrarZona(zona.Id_zona)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron zonas.</p>
        )}
      </div>
    </div>
  );
}