import styled from "styled-components";
import { Text } from "../../../../../components";
import { CareerIcon } from "../../../../../assets/svg";
import { CareerWrapper, CareerContent } from "./index.styles";
export default function Career() {
  return (
    <CareerWrapper>
      <Text typo="subtitle300">경력</Text>
      <CareerContent>
        <CareerIcon height={14} style={{ marginRight: "5px" }} />
        <Text typo="body400" color="blue100">
          총 경력 5년
        </Text>
      </CareerContent>
    </CareerWrapper>
  );
}
