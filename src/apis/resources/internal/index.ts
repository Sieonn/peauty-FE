import { CustomerAPI } from "../../api";
import { UploadImageResponse } from "../../../types/internal";
import FormData from "form-data";

export const uploadImage = async (image: File): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await CustomerAPI.post<UploadImageResponse>(`/v1/internal/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
