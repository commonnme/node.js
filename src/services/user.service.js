import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    nickname: data.nickname,
    phone: data.phone,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const user = await getUser(joinUserId);

  return responseFromUser({ user });
};