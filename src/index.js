import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { handleUserSignUp } from './controllers/user.controller.js';
import { handleAddStore, handleGetStoresByRegion } from './controllers/store.controller.js';
import { handleAddReview, handleGetStoreReviews } from './controllers/review.controller.js';
import { 
  handleAddMission, 
  handleGetStoreMissions, 
  handleChallengeMission 
} from './controllers/mission.controller.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 기존 API
app.post("/api/members/signup", handleUserSignUp);

// 1. 특정 지역에 가게 추가하기 API
app.post("/api/regions/:regionId/stores", handleAddStore);
app.get("/api/regions/:regionId/stores", handleGetStoresByRegion);

// 2. 가게에 리뷰 추가하기 API
app.post("/api/stores/:storeId/reviews", handleAddReview);
app.get("/api/stores/:storeId/reviews", handleGetStoreReviews);

// 3. 가게에 미션 추가하기 API
app.post("/api/stores/:storeId/missions", handleAddMission);
app.get("/api/stores/:storeId/missions", handleGetStoreMissions);

// 4. 가게의 미션을 도전 중인 미션에 추가(미션 도전하기) API
app.post("/api/missions/challenge", handleChallengeMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});