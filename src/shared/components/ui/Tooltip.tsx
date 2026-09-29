import React from "react";

type TooltipSide = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  side?: TooltipSide;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "bottom",
  className = "",
}) => {
  const child = React.Children.only(children) as React.ReactElement<{
    "aria-label"?: string;
  }>;

  return (
    <span className={`ui-tooltip ${className}`.trim()}>
      {React.cloneElement(child, {
        "aria-label": child.props["aria-label"] ?? content,
      })}
      <span className={`ui-tooltip-content ui-tooltip-${side}`} role="tooltip">
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
