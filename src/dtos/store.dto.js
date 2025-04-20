// 요청 본문에서 가게 정보 변환
export const bodyToStore = (body) => {
    return {
      name: body.name,
      address: body.address,
      regionId: body.region_id
    };
  };
  
  // 가게 정보를 응답 형식으로 변환
  export const responseFromStore = ({ store }) => {
    const storeData = store[0];
    
    return {
      id: storeData.id,
      name: storeData.name,
      address: storeData.address,
      region_id: storeData.region_id
    };
  };