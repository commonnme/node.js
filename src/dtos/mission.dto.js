// 요청 본문에서 미션 정보 변환
export const bodyToMission = (body) => {
    return {
      title: body.title,
      description: body.description,
      reward: body.reward,
      storeId: body.store_id,
      deadline: body.deadline
    };
  };
  
  // 미션 정보를 응답 형식으로 변환
  export const responseFromMission = ({ mission }) => {
    const missionData = mission[0];
    
    return {
      id: missionData.id,
      title: missionData.title,
      description: missionData.description,
      reward: missionData.reward,
      store_id: missionData.store_id,
      deadline: missionData.deadline,
      created_at: missionData.created_at
    };
  };
  
  // 미션 참여 정보를 응답 형식으로 변환
  export const responseFromMissionParticipation = (data) => {
    if (!data.success) {
      return {
        success: false,
        message: data.message
      };
    }
    
    return {
      success: true,
      id: data.id,
      message: "미션 도전에 성공했습니다!"
    };
  };