import { responseFromStore } from "../dtos/store.dto.js";
import { addStore, getStore, getStoresByRegion } from "../repositories/store.repository.js";

// 특정 지역에 가게 추가
export const addStoreToRegion = async (data) => {
  const storeId = await addStore({
    name: data.name,
    address: data.address,
    regionId: data.regionId
  });

  if (storeId === null) {
    throw new Error("가게 추가에 실패했습니다.");
  }

  const store = await getStore(storeId);

  return responseFromStore({ store });
};

// 특정 지역의 가게 목록 조회
export const getStoresInRegion = async (regionId) => {
  const stores = await getStoresByRegion(regionId);
  
  return {
    count: stores.length,
    stores: stores
  };
};