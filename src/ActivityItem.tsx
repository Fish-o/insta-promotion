import { CSSProperties } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
} from "remotion";
import { SLIDE_IN_DURATION, FONT_FAMILY } from "./HelloWorld/constants";
import { Activity } from "./Root";

export const ActivityItem: React.FC<{
  readonly activity: Activity;
  readonly delay: number;
}> = ({ activity, delay }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const progress = spring({
    fps: videoConfig.fps,
    frame: frame - delay,
    durationInFrames: SLIDE_IN_DURATION,
    config: {
      damping: 200,
      mass: 0.3,
    },
  });
  const contentStyle: CSSProperties = {
    transform: `translateY(${(1 - progress) * 100}%)`,
  };

  const summaryStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: "400",
    color: "white",
    paddingLeft: 40,
    fontSize: 60,
  };

  const labelTextStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: "400",
    fontSize: 40,
    color: "white",
  };

  const labelTagStyle: React.CSSProperties = {
    padding: "5px 30px 5px 30px",
    fontSize: 20,
    color: "white",
    borderRadius: 30,
    overflow: "visible",
    zIndex: 10,
    boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
    borderStyle: "solid",
    borderWidth: "4px",
    borderColor: "rgba(0,0,0,0.2)",
  };
  return (
    <div
      style={{
        overflow: "hidden",
        boxShadow: `0px 20px 15px rgba(0, 0, 0, ${0.2 * progress})`,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 28,
          ...contentStyle,
        }}
      >
        <div
          style={{
            backgroundColor: "#2450A8",
            height: 240,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Img
            src={
              activity.imageIcon
                ? `https://media.ia.utwente.nl/amelie/${activity.imageIcon}`
                : staticFile("placeholder.jpg")
            }
            style={{
              objectFit: "cover",
              height: "100%",
              width: 450,
              // borderRadius: 10,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <h1 style={summaryStyle}>{activity.summary}</h1>
          </div>
          <div
            style={{
              ...labelTagStyle,
              position: "absolute",
              top: 10,
              right: 10,
              rotate: "10deg",
              backgroundColor: `#${activity.activityLabel.color}`,
            }}
          >
            <span style={labelTextStyle}>{activity.activityLabel.name}</span>
          </div>
          {Number.parseFloat(activity.price) > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: 20,
                // rotate: "10deg",
                // backgroundColor: `#${activity.activityLabel.color}`,
              }}
            >
              <span style={{ ...labelTextStyle, fontWeight: "bold" }}>€</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
