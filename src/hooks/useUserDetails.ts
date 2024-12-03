import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface CustomJwtPayload {
  user: {
    userId: number;
    role: string;
  };
  exp: number;
}

export function useUserDetails() {
  const [userDetails, setUserDetails] = useState<{
    userId: number | null;
    role: string | null;
  }>({ userId: null, role: null });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return;
    }

    try {
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);
      setUserDetails({
        userId: decoded.user.userId,
        role: decoded.user.role,
      });
    } catch (error) {
      console.error("토큰 디코드 중 오류 발생:", error);
      setUserDetails({ userId: null, role: null });
    }
  }, []);

  return userDetails;
}

