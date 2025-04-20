import { responseFromReview } from "../dtos/review.dto.js";
import { addReview, getReview, getReviewsByStore } from "../repositories/review.repository.js";

// 가게에 리뷰 추가
export const addReviewToStore = async (data) => {
  const reviewId = await addReview({
    memberId: data.memberId,
    storeId: data.storeId,
    body: data.body,
    score: data.score
  });

  if (reviewId === null) {
    throw new Error("리뷰 작성에 실패했습니다.");
  }

  const review = await getReview(reviewId);

  return responseFromReview({ review });
};

// 특정 가게의 리뷰 목록 조회
export const getStoreReviews = async (storeId) => {
  const reviews = await getReviewsByStore(storeId);
  
  return {
    count: reviews.length,
    reviews: reviews
  };
};