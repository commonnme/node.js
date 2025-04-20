import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStoreToRegion, getStoresInRegion } from "../services/store.service.js";

// 특정 지역에 가게 추가하기 API
export const handleAddStore = async (req, res, next) => {
  console.log("가게 추가를 요청했습니다!");
  console.log("body:", req.body);

  try {
    const store = await addStoreToRegion(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (error) {
    console.error("가게 추가 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error.message || "가게 추가 중 오류가 발생했습니다." 
    });
    next(error);
  }
};

// 특정 지역의 가게 목록 조회 API
export const handleGetStoresByRegion = async (req, res, next) => {
  const regionId = req.params.regionId;
  
  console.log(`지역 ID ${regionId}의 가게 목록을 요청했습니다!`);
  
  try {
    const result = await getStoresInRegion(regionId);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.error("가게 목록 조회 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ 
      error: error.message || "가게 목록 조회 중 오류가 발생했습니다." 
    });
    next(error);
  }
};