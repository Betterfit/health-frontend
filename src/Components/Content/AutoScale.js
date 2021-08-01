import React, { useLayoutEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";

const AutoScale = ({ children, className }) => {
  const [auto, setAuto] = useState(true);
  const childHeightRef = useRef(null);

  useLayoutEffect(() => {
    const childHeight = getChildrenHeight();
    if (!childHeightRef.current) setAuto(false);
    else if (childHeightRef.current !== childHeight) {
      childHeightRef.current = childHeight;
      resize();
    }
    childHeightRef.current = childHeight;
  });

  const setFixedHeight = (animationData) => {
    // self.oldHeight=newHeight;
    // // const child = self.children[0];
    let height = animationData?.newHeight;
    if (height) {
      console.log("animation ended");
    } else {
    }

    console.log("fixing height to ", height);
    setAuto(false);
    childHeightRef.current = height;
    // console.log(height);
    // let height=document.getElementsByClassName('Auto')[0].clientHeight
    // console.log(height)
    // setHeight(newHeight);
    // height: document.getElementsByClassName('Auto')[0].clientHeight
  };
  const resize = () => {
    console.log("resetting height");
    setAuto(true);
  };

  const getChildrenHeight = () => {
    const self = document.getElementById(1874);
    const child = self.children[0];
    return child?.offsetHeight;
  };

  // const child = document.getElementById(this.props.childId);
  // const parent = child?.parentElement;
  // console.dir(child);
  // console.dir(parent);
  // console.dir(parent?.parentElement);

  console.log(childHeightRef.current, auto);
  return (
    <AnimateHeight
      // onClick={()=>setHeight(350)}
      id={1874}
      height={auto ? "auto" : childHeightRef.current + "px"}
      onAnimationEnd={setFixedHeight}
      className={className + " Auto"}
      styles={{ overflow: "hidden" }}
    >
      {children}
    </AnimateHeight>
  );
};
export default AutoScale;
