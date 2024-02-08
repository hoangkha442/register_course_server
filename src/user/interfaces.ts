import { users_role } from "@prisma/client";
import { Request } from "express";

export interface UserPayload {
    data: {
      userID: number;
    };
}
  
export interface RequestWithUser extends Request {
    user: UserPayload;
}

export interface UpdateUserRole {
  password?: string;
  role: users_role; // Sử dụng enum `users_role` thay vì string
  // Bao gồm các trường khác bạn muốn cập nhật
}