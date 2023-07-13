import { motion } from "framer-motion";
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 640px;
`;

const BoxItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
  border-radius: 12px;
  background-color: rgba(255,255, 255, .4);

  &:nth-child(1) {
    transform-origin: bottom right;
  }

  &:nth-child(2) {
    transform-origin: bottom left;
  }

  &:nth-child(3) {
    transform-origin: top right;
  }

  &:nth-child(4) {
    transform-origin: top left;
  }
`;

const Circle = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 0 7px 3px rgba(0, 0, 0, .1);
`;

const ButtonSwitch = styled(motion.button)`
  margin-top: 50px;
  padding: 6px 10px;
  border-radius: 6px;
  background: #fff;
  font-size: 18px;
  font-weight: bold;
  font-family: sans-serif;
  color: #4692ff;
`;

const boxHoverVar = {
  hover: { scale: 1.15 }
};

const switchHoverVar = {
  hover: {
    scale: 1.2,
    color: '#66cc96',
  }
};

function App() {
  const [ switchClicked, setSwitchClicked ] = useState(false);
  const onSwitch = () => {
    setSwitchClicked((prev) => !prev);
  };

  return (
    <Wrapper>
      <BoxList>
        <BoxItem variants={boxHoverVar} whileHover="hover" />

        <BoxItem variants={boxHoverVar} whileHover="hover">
          {!switchClicked ? <Circle layoutId="circleMotion"></Circle> : null}
        </BoxItem>

        <BoxItem variants={boxHoverVar} whileHover="hover">
          {switchClicked ? <Circle layoutId="circleMotion"></Circle> : null}
        </BoxItem>

        <BoxItem variants={boxHoverVar} whileHover="hover" />
      </BoxList>

      <ButtonSwitch
        onClick={onSwitch}
        variants={switchHoverVar}
        whileHover="hover"
      >
        Switch
      </ButtonSwitch>
    </Wrapper>
  );
}

export default App;
