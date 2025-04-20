export const bodyToUser = (body) => {
  
    return {
      email: body.email,
      nickname: body.nickname,
      phone: body.phone,
    };
  };

  // 추가할 responseFromUser 함수
export const responseFromUser = ({ user }) => {
    // user는 배열로 반환되므로 첫 번째 요소를 가져옵니다
    const userData = user[0];
    
    // 응답 데이터 구조화
    return {
      id: userData.id,
      email: userData.email,
      nickname: userData.nickname,
      phone: userData.phone,
    };
};