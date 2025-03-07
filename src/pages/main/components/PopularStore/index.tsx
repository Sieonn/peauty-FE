import { Text } from "../../../../components";
import { Badge } from "../../../../components/category/Badge";
import { colors } from "../../../../style/color";
import { HomeContentsWrapper } from "../../customer/index.styles";
import {
  PopularStoreItem,
  PopularStoreWrap,
  PopularStoreImg,
  PopularStoreText,
} from "./index.styles";
import { NewStoreBadgeWrap } from "../NewStore/index.styles";
import Alo from "../../../../assets/images/alo.png";
import MyBE from "../../../../assets/images/mybeauty.png";
import { useEffect, useState } from "react";
import { SkeletonUI } from "../SkeletonUI";  // Import the custom SkeletonUI

export default function PopularStore() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2초 후에 로딩 완료
  }, []);

  return (
    <HomeContentsWrapper>
      <Text typo="subtitle200">
        우리동네 <span style={{ color: `${colors.red100}` }}>HOT</span>한 매장
      </Text>
      <PopularStoreWrap>
        <PopularStoreItem>
          {isLoading ? (
            <>
              <SkeletonUI width="90px" height="90px" circle={true}  />
              <PopularStoreText>
                <SkeletonUI width="150px" height="14px" />
                <SkeletonUI width="180px" height="12px" />
                <SkeletonUI width="200px" height="12px" />
              </PopularStoreText>
            </>
          ) : (
            <>
              <PopularStoreImg src={Alo} />
              <PopularStoreText>
                <Text typo="subtitle300">알로하</Text>
                <Text typo="body400">서울 강남구 논현동</Text>
                <NewStoreBadgeWrap>
                  <Badge type="general" text="말티즈 전문가" />
                  <Badge type="general" text="반려견 구조 자격증" />
                </NewStoreBadgeWrap>
              </PopularStoreText>
            </>
          )}
        </PopularStoreItem>

        <PopularStoreItem>
          {isLoading ? (
            <>
              <SkeletonUI width="90px" height="90px" circle={true} />
              <PopularStoreText>
                <SkeletonUI width="150px" height="14px" />
                <SkeletonUI width="180px" height="12px" />
                <SkeletonUI width="200px" height="12px" />
              </PopularStoreText>
            </>
          ) : (
            <>
              <PopularStoreImg src={MyBE} />
              <PopularStoreText>
                <Text typo="subtitle300">마이뷰티독 강남정</Text>
                <Text typo="body400">서울 강남구 역삼동</Text>
                <NewStoreBadgeWrap>
                  <Badge type="general" text="말티즈 전문가" />
                  <Badge type="general" text="반려견 구조 자격증" />
                </NewStoreBadgeWrap>
              </PopularStoreText>
            </>
          )}
        </PopularStoreItem>
      </PopularStoreWrap>
    </HomeContentsWrapper>
  );
}
