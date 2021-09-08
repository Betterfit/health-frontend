import React, { ReactNode, useCallback, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useResizeDetector } from "react-resize-detector";

/**
 * Automatically animates changes in the height of children.
 */
const AnimatedHeightChange = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const [height, setHeight] = useState<"auto" | number>("auto");
  const onResize = useCallback(
    (contentWidth, contentHeight) => {
      if (height !== contentHeight) setHeight(contentHeight);
    },
    [height]
  );
  const { ref: contentRef } = useResizeDetector({ onResize: onResize });

  return (
    <AnimateHeight
      // cannot have any padding
      style={{ padding: "0" }}
      height={height}
      easing="ease-out"
      // classes applied here so that borders aren't cut off
      className={className}
      animateOpacity
    >
      {/* we put children inside of a div because direct child of AnimateHeight
      component has many restrictions (like no padding) */}
      <div ref={contentRef}>{children}</div>
    </AnimateHeight>
  );
};
export default AnimatedHeightChange;
