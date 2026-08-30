import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Title } from "./HelloWorld/Title";
import { Activity } from "./Root";
import { ActivityList } from "./ActivityList";

export type ActivityCompositionProps = {
  readonly data: Activity[];
};

export const ActivityComposition: React.FC<ActivityCompositionProps> = ({
  data,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames - 5],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "#1D428A" }}>
      <AbsoluteFill
        style={{
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Sequences can shift the time for its children! */}
        <Title titleText={"Activity Overview"} />
        <ActivityList activities={data} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
