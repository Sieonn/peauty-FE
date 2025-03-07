import styled, { keyframes, css } from 'styled-components';
import Skeleton from 'react-loading-skeleton';  // Import Skeleton normally
import { colors } from '../../../style/color';

// 애니메이션 정의
const animation = keyframes`
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

// 동적 스타일 컴포넌트 정의
interface SkeletonUIProps {
  width: string;
  height: string;
  circle?: boolean;
}

const SkeletonWrapper = styled.div<SkeletonUIProps>`
  ${({ width, height, circle }) => css`
    width: ${width};
    height: ${height};
    border-radius: ${circle ? '50%' : '4px'};
    margin-bottom: 5px;
    background: linear-gradient(90deg, #dbdbdb 30%, #d3d3d3 50%, #c2c2c2 75%);
    background-size: 300% auto;
    animation: ${animation} 2s infinite linear;
  `}
`;

export const SkeletonUI = ({ width, height, circle }: SkeletonUIProps) => (
  <SkeletonWrapper width={width} height={height} circle={circle}>
    <Skeleton  width={width} height={height} />
  </SkeletonWrapper>
);

export default SkeletonUI;
