import { prototypeAssets } from "../../data/prototypeContent";

type UserStoryLogoProps = {
  className?: string;
  shadowClassName?: string;
  nodeId?: string;
  width?: number;
  height?: number;
};

export function UserStoryLogo({
  className = "",
  shadowClassName = "drop-shadow-[0_4px_18.35px_rgba(0,0,0,0.7)]",
  nodeId,
  width = 133,
  height = 63,
}: UserStoryLogoProps) {
  return (
    <div
      className={`${shadowClassName} ${className}`}
      style={{ width, height }}
      data-node-id={nodeId}
      data-name="brand/logo-component - User Story"
    >
      <img
        src={prototypeAssets.logoUserStory}
        alt="HYUNDAI User Story"
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}
