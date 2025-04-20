import { pool } from "../db.config.js";

// 리뷰 추가하기
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO review (
        member_id, 
        store_id,     
        body,         
        score,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, NOW(), NOW());`,
      [data.memberId, data.storeId, data.body, data.score]
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

// 특정 리뷰 가져오기
export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(
      `SELECT * FROM review WHERE id = ?;`,
      reviewId
    );

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 특정 가게의 리뷰 가져오기
export const getReviewsByStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [reviews] = await pool.query(
      `SELECT r.*, m.nickname 
       FROM review r
       JOIN member m ON r.member_id = m.id
       WHERE r.store_id = ?
       ORDER BY r.created_at DESC;`,
      storeId
    );

    return reviews;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};