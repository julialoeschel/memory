import styled from "styled-components";
import Card from "./components/Card.js";
import Done from "./components/Done.js";
import { useState } from "react";
import { useEffect } from "react";

const cards = [
  {
    id: 1,
    image: "🌈",
    status: "",
    clicked: false,
  },
  {
    id: 2,
    image: "🌈",
    status: "",
    clicked: false,
  },
  {
    id: 3,
    image: "🥷🏼",
    status: "",
    clicked: false,
  },
  {
    id: 4,
    image: "🥷🏼",
    status: "",
    clicked: false,
  },
  {
    id: 5,
    image: "💜",
    status: "",
    clicked: false,
  },
  {
    id: 6,
    image: "💜",
    status: "",
    clicked: false,
  },
  {
    id: 7,
    image: "🥦",
    status: "",
    clicked: false,
  },
  {
    id: 8,
    image: "🥦",
    status: "",
    clicked: false,
  },
  {
    id: 9,
    image: "🔆",
    status: "",
    clicked: false,
  },
  {
    id: 10,
    image: "🔆",
    status: "",
    clicked: false,
  },
  {
    id: 11,
    image: "🦞",
    status: "",
    clicked: false,
  },
  {
    id: 12,
    image: "🦞",
    status: "",
    clicked: false,
  },
];

export default function Home() {
  const [game, setGame] = useState([]);
  const [prevClick, setPrevClick] = useState(null);
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(100);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    setGame(shuffleArray(cards));
  }, []);

  function handleClick(id) {
    game.find((item) => item.id === id).clicked = true;

    if (!prevClick) {
      setPrevClick(game.find((item) => item.id === id));
      setCount(count + 1);
    } else {
      //ist gleich
      if (prevClick.id !== id) {
        if (prevClick.image === game.find((item) => item.id === id).image) {
          setCount(count + 1);

          game.find((item) => item.id === id).status = "match";
          game.find((item) => item.id === prevClick.id).status = "match";
          setGame([...game]);
          setPrevClick(null);
        }
        //ist ungelich
        else {
          setCount(count + 1);

          game.find((item) => item.id === id).status = "noMatch";
          game.find((item) => item.id === prevClick.id).status = "noMatch";
          setGame([...game]);
          setPrevClick(null);
          setTimeout(() => {
            game.find((item) => item.id === id).status = "";
            game.find((item) => item.id === id).clicked = false;
            game.find((item) => item.id === prevClick.id).status = "";
            game.find((item) => item.id === prevClick.id).clicked = false;
            setGame([...game]);
          }, 1000);
        }
      }
    }
  }
  function handleRestart() {
    if (highScore > count) setHighScore(count);

    setCount(0);
    setGame(
      shuffleArray(
        game.map((item) => {
          return { ...item, status: "", clicked: false };
        })
      )
    );
  }

  if (game.every((item) => item.status === "match")) {
    return (
      <Done onResart={handleRestart} count={count} highScore={highScore}></Done>
    );
  }

  return (
    <Body>
      <h1>Emoji Memory</h1>
      <Board>
        {game.map((card) => {
          return (
            <Card
              key={card.id}
              image={card.image}
              id={card.id}
              status={card.status}
              onCardClick={handleClick}
              isClicked={card.clicked}
            ></Card>
          );
        })}
      </Board>
      <Div>
        <Score>Score:</Score>
        <Count>{count}</Count>
      </Div>
      <Restart
        onClick={() => {
          setCount(0);
          setGame(
            shuffleArray(
              game.map((item) => {
                return { ...item, status: "", clicked: false };
              })
            )
          );
        }}
      >
        restart
      </Restart>
      <Div>
        <HighScore>last highscore: </HighScore>
        <HighCount>{highScore}</HighCount>
      </Div>
    </Body>
  );
}

const Body = styled.div`
  display: grid;
  place-items: center;
`;

const Board = styled.ul`
  min-height: 200px;
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  margin: 0;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;
const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const Count = styled.span`
  margin: 40px;
  justify-self: end;
  font-size: 2rem;
`;

const Score = styled.span`
  margin: 40px;
  justify-self: start;
  align-self: center;
`;
const HighCount = styled.span`
  margin: 20px 40px 0 40px;
  justify-self: end;
  font-size: 0.8rem;
`;

const HighScore = styled.span`
  margin: 20px 40px 0 40px;
  justify-self: start;
  width: 100%;
  align-self: center;
  font-size: 0.8rem;
`;

const Restart = styled.button`
  width: 100px;

  background-color: #e9e3eb;
  border: none;
  padding: 8px;
  border-radius: 10px;
`;
