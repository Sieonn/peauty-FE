import Camera from "../../../../../../assets/svg/Camera";
import PetProfile from "../../../../../../assets/svg/PetProfile";
import { CustomInput } from "../../../../../../components/input/CustomInput";
import { RadioSelectButton } from "../../../../../../components/button/RadioSelectButton";
import { Text } from "../../../../../../components/texts/Text";
import { DropButton } from "../../../../../../components/button/DropButton";
import { CustomButton } from "../../../../../../components/button/CustomButton";
import {
  ProfileWrapper,
  CameraIcon,
  SectionWrapper,
  ButtonWrapper,
  InputWrapper,
  HalfWrapper,
} from "../../index.styles";

import { RegisterPuppyRequest } from "../../../../../../types/customer/puppy";
import { ChangeEvent } from "react";

interface Step1Props {
  onNext: () => void;
  inputData: RegisterPuppyRequest;
  handleChange: (key: string, value: string) => void;
}

const breedMapping: Record<string, string> = {
  아펜핀셔: "AFFENPINSCHER",
  테리어: "TERRIER",
  비글: "BEAGLE",
  비숑: "BICHON",
  치와와: "CHIHUAHUA",
  말티즈: "MALTESE",
  포메라니안: "POMERANIAN",
  퍼그: "PUG",
  시츄: "SHIHTZU",
  셰퍼드: "SHEPHERD",
  보더콜리: "BORDER_COLLIE",
  불독: "BULLDOG",
  달마시안: "DALMATIAN",
  푸들: "POODLE",
  리트리버: "RETRIEVER",
  사모예드: "SAMOYED",
};

export default function Step1({ onNext, inputData, handleChange }: Step1Props) {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    handleChange(key, event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange("profileImageUrl", imageUrl);
    }
  };

  const renderProfileImage = () =>
    inputData.profileImageUrl ? (
      <img
        src={inputData.profileImageUrl}
        alt="Pet Profile"
        width="132"
        height="132"
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ) : (
      <PetProfile width="132" height="132" />
    );

  const renderRadioButtonGroup = (
    label: string,
    options: string[],
    selectedIndex: number,
    onSelect: (index: number) => void
  ) => (
    <Text typo="subtitle300">
      {label}
      <RadioSelectButton
        buttonNames={options}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
      />
    </Text>
  );

  return (
    <div>
      <ProfileWrapper>
        <CameraIcon>
          <label htmlFor="profile-image-upload">
            <Camera width="30" height="30" />
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        </CameraIcon>
        {renderProfileImage()}
      </ProfileWrapper>

      <SectionWrapper>
        <Text color="black100" typo="subtitle100">
          기본정보
        </Text>

        <CustomInput
          label="이름"
          placeholder="이름을 입력해주세요"
          fullwidth
          variant="outlined"
          value={inputData.name}
          onChange={(event) => handleInputChange(event, "name")}
        />

        <DropButton
          label="견종"
          placeholder="견종을 선택해주세요"
          options={Object.keys(breedMapping)}
          onSelect={(value) =>
            handleChange("breed", breedMapping[value] || "")
          }
        />

        {renderRadioButtonGroup(
          "분류",
          ["소형견", "중형견", "대형견"],
          ["SMALL", "MEDIUM", "LARGE"].indexOf(inputData.puppySize || "중형견"),
          (index) =>
            handleChange("puppySize", ["SMALL", "MEDIUM", "LARGE"][index])
        )}

        {renderRadioButtonGroup(
          "성별",
          ["남아", "여아"],
          inputData.sex === "M" ? 0 : 1,
          (index) => handleChange("sex", index === 0 ? "M" : "F")
        )}

        <InputWrapper>
          <HalfWrapper>
            <CustomInput
              label="나이"
              placeholder="예) 4"
              variant="outlined"
              value={String(inputData.age)}
              onChange={(event) => handleInputChange(event, "age")}
            />
            <Text color="gray100" typo="body100">
              살
            </Text>
          </HalfWrapper>

          <HalfWrapper>
            <CustomInput
              label="몸무게"
              placeholder="예) 22"
              variant="outlined"
              value={String(inputData.weight)}
              onChange={(event) => handleInputChange(event, "weight")}
            />
            <Text color="gray100" typo="body100">
              kg
            </Text>
          </HalfWrapper>
        </InputWrapper>

        <CustomInput
          label="생일"
          placeholder="예) 2024-12-10"
          variant="outlined"
          value={inputData.birthdate}
          onChange={(event) => handleInputChange(event, "birthdate")}
        />

        <ButtonWrapper>
          <CustomButton fullwidth variant="primary" onClick={onNext}>
            다음
          </CustomButton>
        </ButtonWrapper>
      </SectionWrapper>
    </div>
  );
}
