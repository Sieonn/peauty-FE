import { useState, useEffect } from "react";
import { AppBar, GNB, Text } from "../../../../../components";
import { Maker, Warning } from "../../../../../assets/svg";
import { SelectIcon } from "../../../../../assets/svg";
import BottomSheet from "../../../../../components/bottom-sheet/BottomSheet";
import DesignerItem from "./components/DesignerListItem";
import {
  ContentWrapper,
  DesignerList,
  FilterWrapper,
  LocationInfo,
  LocationWrapper,
  SelectButton,
  SelectWrapper,
  VerificationWrapper,
  ShopWrapper,
} from "./index.styles";
import { getAroundWorkspaces } from "../../../../../apis/customer/resources/customer";
import { useUserDetails } from "../../../../../hooks/useUserDetails";
import { useNavigate } from "react-router-dom";
import {
  GetAroundWorkspacesResponse,
  Workspace,
} from "../../../../../types/customer/customer";
import { ROUTE } from "../../../../../constants/routes";
import Loading from "../../../../../components/page/sign-up/Loading";
import { SendEstimateProposalRequest } from "../../../../../types/customer/bidding";
import Toast from "../../../../../components/toast";

interface SearchStepProps {
  onNext: () => void;
  handleArrayChange: (
    key: keyof SendEstimateProposalRequest,
    value: any,
  ) => void;
}

export default function Search({ onNext, handleArrayChange }: SearchStepProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const user = useUserDetails();
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<string>("최신순");
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.userId || isFetched) {
        return;
      }

      try {
        setLoading(true);
        const response: GetAroundWorkspacesResponse = await getAroundWorkspaces(
          user.userId,
        );
        setCustomerAddress(response.customerAddress || "알 수 없음");
        setWorkspaces(response.workspaces || []);
        setCheckedItems(Array(response.workspaces?.length || 0).fill(false));
        setIsFetched(true);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.userId, isFetched]);

  const handleSelectClick = () => {
    setIsSelecting(!isSelecting);
    if (!isSelecting) {
      setCheckedItems(Array(workspaces.length).fill(false));
      handleArrayChange("designerIds", []);
    }
  };

  const handleCheckboxChange = (index: number, designerId?: number) => {
    if (designerId === undefined) {
      console.error("Invalid designerId:", designerId);
      return;
    }

    const newCheckedItems = checkedItems.map((checked, idx) =>
      idx === index ? !checked : checked,
    );
    setCheckedItems(newCheckedItems);

    const selectedDesignerIds = workspaces
      .filter((_, idx) => newCheckedItems[idx])
      .map((workspace) => workspace.designerId!)
      .filter((id): id is number => id !== undefined);

    handleArrayChange("designerIds", selectedDesignerIds);
  };

  useEffect(() => {
    let sortedWorkspaces = [...workspaces];
    if (sortOption === "최신순") {
      sortedWorkspaces.sort((a, b) => b.designerId! - a.designerId!); // 디자이너 ID 높은 순
    } else if (sortOption === "평점 높은순") {
      sortedWorkspaces.sort((a, b) => b.reviewRating! - a.reviewRating!); // 평점 높은 순
    }
    setWorkspaces(sortedWorkspaces);
  }, [sortOption]); // 정렬 옵션 변경 시 재정렬
  const handleDesignerClick = (
    index: number,
    workspaceId?: number,
    designerId?: number,
  ) => {
    if (isSelecting) {
      if (designerId !== undefined) {
        handleCheckboxChange(index, designerId);
      } else {
        console.error("designerId is undefined");
      }
    } else if (designerId !== undefined) {
      navigate(ROUTE.customer.request.shop(designerId));
    }
  };

  if (!user || !user.userId) {
    return <Text typo="body100">로그인 정보가 없습니다.</Text>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AppBar prefix="backButton" title="요청하기" />
      <ContentWrapper>
        <LocationWrapper>
          <LocationInfo>
            <Maker height={15} />
            <Text typo="body100">{customerAddress}</Text>
          </LocationInfo>
          <VerificationWrapper>
            <Text typo="body600" color="gray100">
              퓨티와 함께하는 검증된 미용사
            </Text>
            <Warning height={12} />
          </VerificationWrapper>
        </LocationWrapper>
        <FilterWrapper>
          <BottomSheet
            options={[
              {
                label: "최신순",
                onClick: () => {
                  setSortOption("최신순");
                },
              },
              {
                label: "평점 높은순",
                onClick: () => {
                  setSortOption("평점 높은순");
                },
              },
            ]}
          />
          <SelectWrapper>
            <SelectButton onClick={handleSelectClick}>
              <SelectIcon height={15} color="blue100" />
              <Text typo="subtitle300" color="blue100">
                {isSelecting ? "완료" : "선택"}
              </Text>
            </SelectButton>
          </SelectWrapper>
        </FilterWrapper>
        <DesignerList>
          {workspaces.length > 0 ? (
            workspaces.map((workspace, idx) => (
              <DesignerItem
                key={workspace.designerId}
                isSelecting={isSelecting}
                isChecked={checkedItems[idx]}
                onCheckboxChange={() =>
                  handleCheckboxChange(idx, workspace.designerId)
                }
                name={workspace.workspaceName || "알 수 없음"}
                experience={workspace.yearOfExperience || 0}
                score={workspace.reviewRating || 0}
                review={workspace.reviewCount || 0}
                badges={
                  workspace.representativeBadges?.map((badge) => ({
                    name: badge.badgeName || "",
                    color: badge.badgeColor || "gray",
                    type: badge.badgeType || "",
                  })) || []
                }
                thumbnailUrl={workspace.bannerImageUrl || ""}
                onClick={() =>
                  handleDesignerClick(
                    idx,
                    workspace.workspaceId,
                    workspace.designerId,
                  )
                }
                address={workspace.address || ""}
              />
            ))
          ) : (
            <ShopWrapper>
              <Text typo="body100" color="gray100">
                주변에 가게가 없어요.
              </Text>
            </ShopWrapper>
          )}
        </DesignerList>
      </ContentWrapper>
      {isSelecting ? (
        <GNB onLargeButtonClick={onNext} buttonText="요청서 작성하기" />
      ) : (
        <GNB type="customer" />
      )}

      {showToast && <Toast>견적 요청이 성공적으로 완료되었습니다!</Toast>}
    </>
  );
}
