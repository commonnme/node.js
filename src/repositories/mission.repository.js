import { pool } from "../db.config.js";

// 가게에 미션 추가하기
export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO mission (
        title, 
        description, 
        reward, 
        store_id, 
        deadline,
        created_at
      ) VALUES (?, ?, ?, ?, ?, NOW());`,
      [
        data.title,
        data.description,
        data.reward,
        data.storeId,
        data.deadline
      ]
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

// 특정 미션 가져오기
export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(
      `SELECT * FROM mission WHERE id = ?;`,
      missionId
    );

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 특정 가게의 미션 목록 가져오기
export const getMissionsByStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [missions] = await pool.query(
      `SELECT * FROM mission WHERE store_id = ? AND datediff(deadline, NOW()) > 0 ORDER BY deadline ASC;`,
      storeId
    );

    return missions;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 회원의 미션 참여하기 (미션 도전)
export const participateMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    // 이미 참여 중인 미션인지 확인
    const [existing] = await pool.query(
      `SELECT * FROM member_mission 
       WHERE member_id = ? AND mission_id = ?;`,
      [data.memberId, data.missionId]
    );

    if (existing.length > 0) {
      return { success: false, message: "이미 참여 중이거나 완료한 미션입니다." };
    }

    const [result] = await pool.query(
      `INSERT INTO member_mission (
        member_id, 
        mission_id, 
        status, 
        started_at, 
        created_at
      ) VALUES (?, ?, '진행 중', NOW(), NOW());`,
      [data.memberId, data.missionId]
    );

    return { success: true, id: result.insertId };
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};