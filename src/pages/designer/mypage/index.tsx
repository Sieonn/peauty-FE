import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Divider, GNB, SubMenuButton, Text } from "../../../components";
import ProfileImg from "../../../components/profile-img/ProfileImg";
import { GetDesignerAccountResponse } from "../../../types/designer/designer";
import { getDesignerAccount } from "../../../apis/designer/resources/designer";
import { useUserDetails } from "../../../hooks/useUserDetails";
import {
  ContentWrapper,
  InfoWrapper,
  PageWrapper,
  ProfileImageWrapper,
  ProfileMenuWrapper,
  ProfileWrapper,
  MyInfoWrapper,
} from "./index.styles";
import Loading from "../../../components/page/sign-up/Loading";
import { ROUTE } from "../../../constants/routes";

export default function DesignerMyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<GetDesignerAccountResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  //const userId = 1;
  const { userId } = useUserDetails();

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId !== null) {
        // userId가 null인지 확인
        try {
          const data = await getDesignerAccount(userId);
          setProfile(data); // API 응답 데이터를 state에 저장
        } catch (error) {
          console.error("프로필이 없습니다.:", error);
        }
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <>
      <AppBar prefix="backButton" title="회원정보" />
      <PageWrapper>
        <ProfileWrapper>
          <ProfileImageWrapper>
            <ProfileImg
              src={profile?.profileImageUrl || " "}
              alt="프로필사진"
              width={"75"}
              height={"75"}
            />
          </ProfileImageWrapper>
          <ProfileMenuWrapper>
            <MyInfoWrapper>
              <Text typo={"subtitle100"} color={"blue100"}>
                {profile?.nickname || ""}
                <Text typo={"subtitle100"}> 님</Text>
              </Text>
              <Text
                typo={"body400"}
                color={"gray100"}
                onClick={() => navigate("/designer/mypage/detail")}
                style={{ cursor: "pointer" }}
              >
                내 정보 수정하기
              </Text>
            </MyInfoWrapper>
            <SubMenuButton text="" to="/designer/mypage/detail" />
          </ProfileMenuWrapper>
        </ProfileWrapper>
        <Divider thickness={2} />
        <ContentWrapper>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <InfoWrapper>
              <Text typo="subtitle200" color="black">
                나의 매장 정보
              </Text>
            </InfoWrapper>
            <SubMenuButton
              text="매장 정보 수정/인증"
              to={ROUTE.designer.signupDetail}
            />
          </div>
          <Divider />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <Text typo="subtitle200" color="black">
              나의 뱃지
            </Text>
            <SubMenuButton text="뱃지 내역" to="/designer/mypage/badges" />
          </div>
          <Divider />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <Text typo="subtitle200">고객지원</Text>
            <div>
              <SubMenuButton text="공지사항" to="/" />
              <SubMenuButton text="이용약관" to="/" />
              <SubMenuButton text="퓨티안내" to="/" />
            </div>
          </div>
        </ContentWrapper>
      </PageWrapper>
      <GNB type={"designer"} />
    </>
  );
}
