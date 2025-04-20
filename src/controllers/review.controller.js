import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReviewToStore, getStoreReviews } from "../services/review.service.js";

// 가게에 리뷰 추가하기 API
export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  try {
    // 첫 번째 사용자(id: 1)로 고정
    req.body.member_id = 1;
    
    const review = await addReviewToStore(bodyToReview(req.body));
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    console.error("리뷰 추가 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error.message || "리뷰 추가 중 오류가 발생했습니다." 
    });
    next(error);
  }
};

// 특정 가게의 리뷰 목록 조회 API
export const handleGetStoreReviews = async (req, res, next) => {
  const storeId = req.params.storeId;
  
  console.log(`가게 ID ${storeId}의 리뷰 목록을 요청했습니다!`);
  
  try {
    const result = await getStoreReviews(storeId);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.error("리뷰 목록 조회 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error.message || "리뷰 목록 조회 중 오류가 발생했습니다." 
    });
    next(error);
  }
};