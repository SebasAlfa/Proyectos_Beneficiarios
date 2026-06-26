import pool from '../db/connection';

const LocalidadModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM localidades');
    return rows;
  },

  create: async (CODLOC, LOCALIDAD) => {
    const [result] = await pool.query(
      'INSERT INTO localidades (CODLOC, LOCALIDAD) VALUES (?, ?)',
      [CODLOC, LOCALIDAD]
    );
    return result;
  },

  update: async (Id_localidad, CODLOC, LOCALIDAD) => {
    const [result] = await pool.query(
      'UPDATE localidades SET CODLOC = ?, LOCALIDAD = ? WHERE Id_localidad = ?',
      [CODLOC, LOCALIDAD, Id_localidad]
    );
    return result;
  },

  delete: async (Id_localidad) => {
    const [result] = await pool.query(
      'DELETE FROM localidades WHERE Id_localidad = ?',
      [Id_localidad]
    );
    return result;
  },

  search: async (texto) => {
    const [rows] = await pool.query(
      `SELECT * FROM localidades
       WHERE CODLOC LIKE ?
       OR LOCALIDAD LIKE ?`,
      [`%${texto}%`, `%${texto}%`]
    );

    return rows;
  }
};

export default LocalidadModel;