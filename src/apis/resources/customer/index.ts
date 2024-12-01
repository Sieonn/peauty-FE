import { CustomerAPI } from "../../api";
import { GetCustomerProfileResponse } from "../../../types/customer";
import { UpdateCustomerProfileResponse } from "../../../types/customer";
import { UpdateCustomerProfileRequest } from "../../../types/customer";
import { UploadProfileImageResponse } from "../../../types/customer";
import FormData from "form-data";
import { CheckCustomerNicknameDuplicatedResponse } from "../../../types/customer";

export const getCustomerProfile = async (userId: number): Promise<GetCustomerProfileResponse> => {
  const res = await CustomerAPI.get<GetCustomerProfileResponse>(`/v1/users/${userId}/profile`);
  return res.data;
};

export const updateCustomerProfile = async (userId: number, data: UpdateCustomerProfileRequest): Promise<UpdateCustomerProfileResponse> => {
  const res = await CustomerAPI.put<UpdateCustomerProfileResponse>(`/v1/users/${userId}/profile`, data);
  return res.data;
};

export const uploadProfileImage = async (userId: number, image: File): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await CustomerAPI.post<UploadProfileImageResponse>(`/v1/users/${userId}/profile/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const checkCustomerNicknameDuplicated = async (query: { nickname: string }): Promise<CheckCustomerNicknameDuplicatedResponse> => {
  const res = await CustomerAPI.get<CheckCustomerNicknameDuplicatedResponse>(`/v1/users/check`, { params: query });
  return res.data;
};
