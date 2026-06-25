import pool from '../db/connection';

const ZonaModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM zona');
    return rows;
  },

  create: async (ZONA_COLEGIO_GRADUACION_MEDIA) => {
    const [result] = await pool.query(
      'INSERT INTO zona (ZONA_COLEGIO_GRADUACION_MEDIA) VALUES (?)',
      [ZONA_COLEGIO_GRADUACION_MEDIA]
    );
    return result;
  },

  update: async (Id_zona, ZONA_COLEGIO_GRADUACION_MEDIA) => {
    const [result] = await pool.query(
      'UPDATE zona SET ZONA_COLEGIO_GRADUACION_MEDIA = ? WHERE Id_zona = ?',
      [ZONA_COLEGIO_GRADUACION_MEDIA, Id_zona]
    );
    return result;
  },

  delete: async (Id_zona) => {
    const [result] = await pool.query(
      'DELETE FROM zona WHERE Id_zona = ?',
      [Id_zona]
    );
    return result;
  }
};

export default ZonaModel;