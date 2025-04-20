import { pool } from "../db.config.js";

// 특정 지역에 가게 추가하기
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO store (name, address, region_id) VALUES (?, ?, ?);`,
      [data.name, data.address, data.regionId]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 특정 가게 정보 가져오기
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 특정 지역의 가게들 가져오기
export const getStoresByRegion = async (regionId) => {
  const conn = await pool.getConnection();

  try {
    const [stores] = await pool.query(
      `SELECT * FROM store WHERE region_id = ?;`,
      regionId
    );

    return stores;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};