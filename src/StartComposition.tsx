import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { FONT_FAMILY } from "./HelloWorld/constants";

export type StartCompositionProps = {
  readonly week: number;
};

const title: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "500",
  color: "white",
  fontSize: 110,
  textAlign: "center",
  margin: 15,
  width: "100%",
};

const word: React.CSSProperties = {
  color: "white",
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const StartComposition: React.FC<StartCompositionProps> = ({ week }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames - 3],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const progress = spring({
    fps: fps,
    frame: frame - 0,
    durationInFrames: 100,
    config: {
      damping: 70,
      mass: 40,
    },
  });

  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "#1D428A" }} from={-6}>
      <AbsoluteFill
        style={{
          opacity,
          // transform: `translateX(${(1 - opacity) * -1080}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#2450A8",
          boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
            height: "50%",
            width: "100%",
          }}
        >
          <h1 style={{ ...title, ...word }}> Week overview</h1>
          <div
            style={{
              height: 900,
              transform: `rotate(${100 + progress * 260}deg)`,
              scale: `${Math.min(progress, 1)}`,
            }}
          >
            <Img
              src={staticFile("inter-actief-logo-onder-wit.svg")}
              color={"white"}
              style={{}}
              cropBottom={0.24}
            />
          </div>
          <h1 style={{ ...title, ...word }}>
            {" "}
            {["Week", "", week].map((t, i) => {
              const delay = i * 10;

              const scale = spring({
                fps: fps,
                frame: frame - delay,
                config: {
                  damping: 200,
                },
              });

              return (
                <span
                  key={t}
                  style={{
                    ...word,
                    // color: ,
                    transform: `scale(${scale})`,
                  }}
                >
                  {t}
                </span>
              );
            })}
          </h1>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
