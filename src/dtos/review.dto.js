// 요청 본문에서 리뷰 정보 변환
export const bodyToReview = (body) => {
    return {
      memberId: body.member_id,
      storeId: body.store_id,
      body: body.body,
      score: body.score
    };
  };
  
  // 리뷰 정보를 응답 형식으로 변환
  export const responseFromReview = ({ review }) => {
    const reviewData = review[0];
    
    return {
      id: reviewData.id,
      member_id: reviewData.member_id,
      store_id: reviewData.store_id,
      body: reviewData.body,
      score: reviewData.score,
      created_at: reviewData.created_at
    };
  };