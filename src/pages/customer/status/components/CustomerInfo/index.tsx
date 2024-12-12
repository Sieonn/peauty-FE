import { 
  CardContainer, 
  CardWrapper, 
  Thumbnail, 
  InfoWrapper, 
  NameWrapper, 
  DateWrapper,
  RatingWrapper, 
  ButtonWrapper, 
  StyledButton ,
  StoreReservationWrapper
} from "./index.styles";
import { Text } from "../../../../../components";
import Rating from "../../../../../components/rating";
import{ Divider} from "../../../../../components";

interface ButtonProps {
  width: string;
  height?: string;
  title: string;
  bgColor: string;
  color: string;
  onClick: () => void;
}

interface CustomerInfoProps {
  date?: number;
  name: string;
  store: string;
  score: number;
  reservation?: string;
  review: number;
  status?: string;
  payment: number;
  thumbnailUrl: string;
  buttons: ButtonProps[];
}

export default function CustomerInfo({
  name,
  date,
  store,
  score,
  review,
  thumbnailUrl,
  buttons,
  status,
  payment,
  reservation,
  
}: CustomerInfoProps) {
  return (
    <CardContainer>
      {date && (
            <>
         
              <DateWrapper>{date}</DateWrapper>
              <Divider thickness={1} />
            </>
          )}
     <CardWrapper>
      
        <Thumbnail src={thumbnailUrl} alt={name} />
        <InfoWrapper>
          
          <StoreReservationWrapper>
    <Text typo="subtitle200">{store}</Text>
    <Text typo="subtitle200" color={"blue100"}>{reservation}</Text>
  </StoreReservationWrapper>
          
          <NameWrapper>
            <Text typo={"body500"}>{name}</Text>
            {status && <Text typo={"body500"} color={"blue100"}>{status}</Text>}
          </NameWrapper>
          <RatingWrapper>
            <Rating starSize="10" score={score} fontsize="body600" color="gray100" />
            <Text typo="body600" color="gray100">({review})</Text>
            {payment && <Text typo={"subtitle200"} color={"black"}>{payment}</Text>}
          </RatingWrapper>
        </InfoWrapper>
      </CardWrapper>
      {buttons.length > 0 && (
        <ButtonWrapper>
          {buttons.map((button, index) => (
            <StyledButton
              key={index}
              bgColor={button.bgColor}
              color={button.color}
              width={button.width}
              height={button.height}
              onClick={button.onClick}
            >
              {button.title}
            </StyledButton>
          ))}
        </ButtonWrapper>
      )}
    </CardContainer>
  );
}
