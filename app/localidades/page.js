'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function LocalidadesCrud() {
  const [localidades, setLocalidades] = useState([]);
  const [codLocalidad, setCodLocalidad] = useState('');
  const [nombreLocalidad, setNombreLocalidad] = useState('');
  const [buscar, setBuscar] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const fetchLocalidades = async (texto = '') => {
    try {
      const url = texto
        ? `/api/localidades?buscar=${encodeURIComponent(texto)}`
        : '/api/localidades';

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) {
        setLocalidades(data);
      } else {
        setLocalidades([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocalidades();
  }, []);

  const buscarLocalidad = (e) => {
    const texto = e.target.value;
    setBuscar(texto);
    fetchLocalidades(texto);
  };

  const prepararEdicion = (loc) => {
    setCodLocalidad(loc.CODLOC);
    setNombreLocalidad(loc.LOCALIDAD);
    setEditandoId(loc.Id_localidad);
  };

  const guardarLocalidad = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await fetch(`/api/localidades/${editandoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            CODLOC: codLocalidad,
            LOCALIDAD: nombreLocalidad
          })
        });

        setEditandoId(null);
      } else {
        await fetch('/api/localidades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Cod_localidad: codLocalidad,
            Localidad: nombreLocalidad
          })
        });
      }

      setCodLocalidad('');
      setNombreLocalidad('');
      setBuscar('');

      fetchLocalidades();
    } catch (error) {
      console.error(error);
    }
  };

  const borrarLocalidad = async (id) => {
    try {
      await fetch(`/api/localidades/${id}`, {
        method: 'DELETE'
      });

      fetchLocalidades();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gestión de Localidades</h1>

      <input
        className={styles.input}
        type="text"
        placeholder="Buscar por código o nombre..."
        value={buscar}
        onChange={buscarLocalidad}
      />

      <button
        className={styles.button}
        onClick={() => {
          setBuscar('');
          fetchLocalidades();
        }}
        style={{ marginLeft: '10px' }}
      >
        Mostrar todas
      </button>

      <br />
      <br />

      <form onSubmit={guardarLocalidad} className={styles.form}>
        <input
          className={styles.input}
          type="number"
          placeholder="Código"
          value={codLocalidad}
          onChange={(e) => setCodLocalidad(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Nombre"
          value={nombreLocalidad}
          onChange={(e) => setNombreLocalidad(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          {editandoId ? 'Actualizar Localidad' : 'Crear Localidad'}
        </button>
      </form>

      <div>
        {localidades.length > 0 ? (
          localidades.map((loc) => (
            <div key={loc.Id_localidad} className={styles.card}>
              <strong>Código: {loc.CODLOC}</strong> - {loc.LOCALIDAD}

              <div style={{ marginTop: '10px' }}>
                <button
                  className={styles.button}
                  onClick={() => prepararEdicion(loc)}
                >
                  Editar
                </button>

                <button
                  className={`${styles.button} ${styles.buttonDelete}`}
                  onClick={() => borrarLocalidad(loc.Id_localidad)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron localidades.</p>
        )}
      </div>
    </div>
  );
}