'use client';

import { useState, useEffect } from 'react';
import styles from '../sexo/style.module.css';

export default function SexoCrud() {
  const [sexos, setSexos] = useState([]);
  const [idSexo, setIdSexo] = useState('');
  const [sexo, setSexo] = useState('');
  const [buscar, setBuscar] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const fetchSexos = async (texto = '') => {
    try {
      const url = texto
        ? `/api/sexo?buscar=${encodeURIComponent(texto)}`
        : '/api/sexo';

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) {
        setSexos(data);
      } else {
        setSexos([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSexos();
  }, []);

  const buscarSexo = (e) => {
    const texto = e.target.value;
    setBuscar(texto);
    fetchSexos(texto);
  };

  const prepararEdicion = (item) => {
    setIdSexo(item.ID_SEXO);
    setSexo(item.SEXOS);
    setEditandoId(item.ID_SEXO);
  };

  const guardarSexo = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await fetch(`/api/sexo/${editandoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            SEXOS: sexo
          })
        });
      } else {
        await fetch('/api/sexo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ID_SEXO: idSexo,
            SEXOS: sexo
          })
        });
      }

      setIdSexo('');
      setSexo('');
      setBuscar('');
      setEditandoId(null);

      fetchSexos();
    } catch (error) {
      console.error(error);
    }
  };

  const borrarSexo = async (id) => {
    try {
      await fetch(`/api/sexo/${id}`, {
        method: 'DELETE'
      });

      fetchSexos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gestión de Sexo</h1>

      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar por ID o nombre..."
          value={buscar}
          onChange={buscarSexo}
        />

        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setBuscar('');
            fetchSexos();
          }}
        >
          Mostrar todos
        </button>
      </div>

      <form onSubmit={guardarSexo} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="ID Sexo"
          value={idSexo}
          onChange={(e) => setIdSexo(e.target.value)}
          disabled={editandoId !== null}
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Nombre del Sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          {editandoId ? 'Actualizar Sexo' : 'Crear Sexo'}
        </button>
      </form>

      <div>
        {sexos.length > 0 ? (
          sexos.map((item) => (
            <div key={item.ID_SEXO} className={styles.card}>
              <strong>{item.ID_SEXO}</strong> - {item.SEXOS}

              <div style={{ marginTop: '10px' }}>
                <button
                  className={styles.button}
                  onClick={() => prepararEdicion(item)}
                >
                  Editar
                </button>

                <button
                  className={`${styles.button} ${styles.buttonDelete}`}
                  onClick={() => borrarSexo(item.ID_SEXO)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron registros.</p>
        )}
      </div>
    </div>
  );
}