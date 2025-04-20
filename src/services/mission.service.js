import { responseFromMission, responseFromMissionParticipation } from "../dtos/mission.dto.js";
import { 
  addMission, 
  getMission, 
  getMissionsByStore,
  participateMission
} from "../repositories/mission.repository.js";

// 가게에 미션 추가
export const addMissionToStore = async (data) => {
  const missionId = await addMission({
    title: data.title,
    description: data.description,
    reward: data.reward,
    storeId: data.storeId,
    deadline: data.deadline
  });

  if (missionId === null) {
    throw new Error("미션 추가에 실패했습니다.");
  }

  const mission = await getMission(missionId);

  return responseFromMission({ mission });
};

// 특정 가게의 미션 목록 조회
export const getStoreMissions = async (storeId) => {
  const missions = await getMissionsByStore(storeId);
  
  return {
    count: missions.length,
    missions: missions
  };
};

// 미션 도전하기
export const challengeMission = async (data) => {
  const result = await participateMission({
    memberId: data.memberId,
    missionId: data.missionId
  });

  return responseFromMissionParticipation(result);
};