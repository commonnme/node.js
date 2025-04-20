    import { pool } from "../db.config.js";

    // User 데이터 삽입
    export const addUser = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
        `SELECT EXISTS(SELECT 1 FROM info WHERE email = ?) as isExistEmail;`,
        data.email
        );

        if (confirm[0].isExistEmail) {
        return null;
        }

        const [result] = await pool.query(
        `INSERT INTO info (email, nickname, phone) VALUES (?, ?, ?);`,
        [
            data.email,
            data.nickname,
            data.phone,
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

    // 사용자 정보 얻기
    export const getUser = async (userId) => {
    const conn = await pool.getConnection();

    try {
        const [user] = await pool.query(`SELECT * FROM info WHERE id = ?;`, userId);

        console.log(user);

        if (user.length == 0) {
        return null;
        }

        return user;
    } catch (err) {
        throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
    };

