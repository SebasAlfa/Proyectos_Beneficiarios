import pool from '../db/connection';

const SexoModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM sexo');
    return rows;
  },

  create: async (ID_SEXO, SEXOS) => {
    const [result] = await pool.query(
      'INSERT INTO sexo (ID_SEXO, SEXOS) VALUES (?, ?)',
      [ID_SEXO, SEXOS]
    );
    return result;
  },

  update: async (ID_SEXO, SEXOS) => {
    const [result] = await pool.query(
      'UPDATE sexo SET SEXOS = ? WHERE ID_SEXO = ?',
      [SEXOS, ID_SEXO]
    );
    return result;
  },

  delete: async (ID_SEXO) => {
    const [result] = await pool.query(
      'DELETE FROM sexo WHERE ID_SEXO = ?',
      [ID_SEXO]
    );
    return result;
  }
};

export default SexoModel;