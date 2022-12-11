import styled, { keyframes } from "styled-components";

export default function Done({ count, highScore, onResart }) {
  return (
    <Div>
      <h1>You win</h1>
      <p>your score is {count}</p>
      <p>the highscore is {highScore}</p>
      {count < highScore ? <Pa>you set a new higscore</Pa> : null}
      <Restart
        onClick={() => {
          onResart();
        }}
      >
        restart
      </Restart>
    </Div>
  );
}

const Jump = keyframes`
0% {
    transform: scale(0.1);
    opacity: 0;
  }  
  70% {
    transform: scale(1.25);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;	
  }
`;

const Div = styled.div`
  display: grid;
  place-items: center;

  h1 {
    color: red;
    margin-top: 80px;
    transform: scale(1.3);
    animation: ${Jump} 2s alternate;
  }
`;

const Pa = styled.p`
  color: red;
  animation: ${Jump} 2s alternate;
`;

const Restart = styled.button`
  width: 100px;
  margin: 50px;
  background-color: #e9e3eb;
  border: none;
  padding: 8px;
  border-radius: 10px;
`;
