import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMissionToStore, getStoreMissions, challengeMission 
} from "../services/mission.service.js";

// 가게에 미션 추가하기 API
export const handleAddMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  try {
    const mission = await addMissionToStore(bodyToMission(req.body));
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (error) {
    console.error("미션 추가 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error.message || "미션 추가 중 오류가 발생했습니다." 
    });
    next(error);
  }
};

// 특정 가게의 미션 목록 조회 API
export const handleGetStoreMissions = async (req, res, next) => {
  const storeId = req.params.storeId;
  
  console.log(`가게 ID ${storeId}의 미션 목록을 요청했습니다!`);
  
  try {
    const result = await getStoreMissions(storeId);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.error("미션 목록 조회 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error.message || "미션 목록 조회 중 오류가 발생했습니다." 
    });
    next(error);
  }
};

// 미션 도전하기 API
export const handleChallengeMission = async (req, res, next) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body);

  try {
    // 첫 번째 사용자(id: 1)로 고정
    const result = await challengeMission({
      memberId: 1, // 첫 번째 사용자 ID
      missionId: req.body.mission_id
    });

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.error("미션 도전 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error.message || "미션 도전 중 오류가 발생했습니다." 
    });
    next(error);
  }
};