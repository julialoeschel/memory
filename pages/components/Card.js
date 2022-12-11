import styled, { keyframes } from "styled-components";

export default function Card({ image, id, status, onCardClick, isClicked }) {
  return (
    <SingleCard
      onClick={() => onCardClick(id)}
      status={status}
      isClicked={isClicked}
    >
      <Img isClicked={isClicked}>{image}</Img>
    </SingleCard>
  );
}

const hideCard = keyframes`
    0%,
    70% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(180deg);
    }
  `;

const SingleCard = styled.li`
  max-width: 100px;
  border-radius: 20px;
  max-height: 100px;
  display: grid;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  place-items: center;
  font-size: 2rem;
  animation: 2s ${hideCard} linear;
  transition: transform 0.5s;
  transform: ${(props) =>
    props.isClicked ? "rotateY(180deg)" : "rotateY(0deg)"};
  background-color: ${(props) =>
    props.status === "match"
      ? " #90ec7c "
      : props.status === "noMatch"
      ? " #f59393 "
      : "#e9e3eb"};
`;

const hideImage = keyframes`0%,
70% {
  transform: scale(1);
}
100% {
  transform: scale(0);
}
`;

const Img = styled.p`
  transform: ${(props) => (props.isClicked ? "scale(1)" : "scale(0)")};
  transition: transform 0.5s;
  animation: 2s ${hideImage} linear;
`;
