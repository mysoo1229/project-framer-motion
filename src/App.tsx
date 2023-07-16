import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: linear-gradient(120deg, #4692ff, #66cc96);
`;

const BoxList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 640px;
`;

const BoxItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 2;
  height: 200px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 10px 7px rgba(0, 0, 0, .05);

  &:first-child {
    transform-origin: bottom right !important;
    grid-column: span 1;
  }

  &:last-child {
    transform-origin: top left !important;
    grid-column: span 1;
  }
`;

const Circle = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #4692ff;
  box-shadow: 0 0 7px 3px rgba(0, 0, 0, .1);
`;

const ButtonSwitch = styled.button`
  margin-top: 50px;
  padding: 6px 10px;
  border-radius: 6px;
  background: #fff;
  font-size: 18px;
  font-weight: bold;
  font-family: sans-serif;
  color: #4692ff;
  transition: all .3s ease;
`;

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
`;

const OverlayBox = styled(motion.div)`
  width: 310px;
  height: 240px;
  background: #fff;
  border-radius: 12px;
`;

const boxHoverVar = {
  hover: { scale: 1.15 }
};

function App() {
  const [ switchClicked, setSwitchClicked ] = useState(false);
  const [ boxId, setBoxId ] = useState<null | string>(null);

  const onSwitch = () => {
    setSwitchClicked((prev) => !prev);
  };

  const boxArray = [
    {
      id: "box1",
      type: "hover",
    },
    {
      id: "box2",
      type: "circle1",
    },
    {
      id: "box3",
      type: "circle2",
    },
    {
      id: "box4",
      type: "hover",
    },
  ];

  return (
    <Wrapper>
      <BoxList>
        {boxArray.map((box) => {
          switch (box.type) {
            case 'hover' :
              return (
                <BoxItem
                  key={box.id}
                  layoutId={box.id}
                  onClick={() => setBoxId(box.id)}
                  variants={boxHoverVar}
                  whileHover="hover"
                />
              );
            case 'circle1' :
              return (
                <BoxItem key={box.id}>
                  {!switchClicked ? <Circle layoutId="circleMotion"></Circle> : null}
                </BoxItem>
              );
            case 'circle2' :
              return (
                <BoxItem key={box.id} className={box.type}>
                  {switchClicked ? <Circle layoutId="circleMotion" style={{background: "#66cc96"}}></Circle> : null}
                </BoxItem>
              );
          }
        })}
      </BoxList>

      <ButtonSwitch
        onClick={onSwitch}
        style={{
          transform: switchClicked ? 'scale(1.3)' : 'scale(1)',
          color: switchClicked ? '#66cc96' : '#4692ff'
        }}
      >
        Switch
      </ButtonSwitch>

      <AnimatePresence>
        {boxId ? (
          <Overlay
            onClick={() => setBoxId(null)}
            initial={{backgroundColor: "rgba(0, 0, 0, 0)"}}
            animate={{backgroundColor: "rgba(70, 146, 255, .7)"}}
            exit={{backgroundColor: "rgba(0, 0, 0, 0)"}}
          >
            <OverlayBox layoutId={boxId} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
