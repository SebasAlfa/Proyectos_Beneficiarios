'use client';

import { useState, useEffect } from 'react';
import styles from '../sexo/style.module.css';

export default function SexoCrud() {
  const [sexos, setSexos] = useState([]);
  const [idSexo, setIdSexo] = useState('');
  const [sexo, setSexo] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const fetchSexos = async () => {
    try {
      const res = await fetch('/api/sexo');
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
        {sexos.map((item) => (
          <div key={item.ID_SEXO} className={styles.card}>
            <strong>{item.ID_SEXO}</strong> - {item.SEXOS}

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
        ))}
      </div>
    </div>
  );
}