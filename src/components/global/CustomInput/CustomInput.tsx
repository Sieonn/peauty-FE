import React, { InputHTMLAttributes, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { typography } from '../../../style/typography';
import { colors } from '../../../style/color';
import theme from '../../../style/theme';
interface CustomInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 입력 필드 라벨
   */
  label?: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 도움말 텍스트
   */
  hint?: string;
  /**
   * 너비를 100%로 설정
   */
  fullWidth?: boolean;
  /**
   * 입력 필드 스타일 변형
   */
  variant?: 'outlined' | 'underlined';
  /**
   * 입력 필드 오른쪽에 추가할 요소
   */
  suffix?: ReactNode;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${theme.size.maxWidth};
  /* width: ${(props) => (props.$fullWidth ? `theme.size.maxWidth` : 'auto')}; */ //우선 적으로 Full로 받고 추후 수정
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  margin-bottom: 5px;
  font-size: ${typography.body2};
`;

const InputWrapper = styled.div<{ $variant: string; $error: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${(props) => (props.$disabled ? colors.gray100 : 'transparent')};
  ${({ $variant, $error, $disabled }) =>
    $variant === 'outlined'
      ? css`
          border-radius: 5px;
          border: ${$disabled ? `none`: `1px solid ${$error ? `${colors.red200}` : `${colors.gray300}`}`};
          padding: 0px 10px;
          height: 40px;

          &:focus-within {
            border-color: ${$error ? `${colors.red200}` : `${colors.blue200}`};
            box-shadow: 0 0 0 3px ${$error ? `${colors.red100}` : `${colors.blue100}`};
          }
        `
      : css`
          border: none;
          border-bottom: 1px solid ${$error ? `${colors.red200}` : `${colors.gray300}`};
          border-radius: 0;
          padding: 5px 10px;
          height: 32px;

          &:focus-within {
            border-bottom-color: ${$error ? `${colors.red200}` : `${colors.blue200}`};
          }
        `}
`;

const StyledInput = styled.input<{ $error: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;

  &::placeholder {
    color: #9ca3af;
    font-size: ${typography.body6};
  }

  &:disabled {
    color: ${colors.gray300};
    cursor: not-allowed;
    font-size: 12px;
  }
`;

const SuffixContainer = styled.div`
  margin-left: 8px; /* 입력 필드와 suffix 간 간격 */
`;

const Message = styled.p<{ $error?: boolean }>`
  font-size: ${typography.body6};
  margin-top: 4px;
  color: ${(props) => (props.$error ? `${colors.red300}` : '#6b7280')};
  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  hint,
  fullWidth = false,
  disabled = false,
  variant = 'outlined',
  suffix,
  ...props
}) => {
  return (
    <Container $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <InputWrapper $variant={variant} $error={!!error}  $disabled={disabled}>
        <StyledInput $error={!!error} disabled={disabled} {...props} />
        {suffix && <SuffixContainer>{suffix}</SuffixContainer>}
      </InputWrapper>
      {(error || hint) && <Message $error={!!error}>{error || hint}</Message>}
    </Container>
  );
};
