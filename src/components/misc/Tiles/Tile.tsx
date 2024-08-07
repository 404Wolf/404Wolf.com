"use client";

import TileTitle from "./Title";
import useTitleWidth from "./useTitleWidth";

export interface TileProps {
  title?: string;
  className?: string;
  type?: boolean;
  children: React.ReactNode;
  direction?: "left" | "right";
  extraPadding?: number;
  containerClass?: string;
}

const Tile = ({
  title,
  children,
  className = "",
  type = true,
  direction = "left",
  extraPadding = 0,
  containerClass = "h-full relative",
}: TileProps) => {
  const titleWidth = title ? useTitleWidth(title) : 0;

  return (
    <div className={containerClass}>
      {title && (
        <TileTitle
          title={title}
          titleWidth={titleWidth}
          direction={direction}
          type={type}
        />
      )}
      <div
        className={`${className} mb-auto p-3 md:p-5 pt-5 md:pt-5 bg-slate-300 rounded-2xl h-full ${className} drop-shadow-sm`}
      >
        <div style={{ padding: `${extraPadding}px` }}>{children}</div>
      </div>
    </div>
  );
};

export default Tile;
