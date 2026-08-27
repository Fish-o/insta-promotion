import { CSSProperties } from "react";
import { useVideoConfig, useCurrentFrame, spring } from "remotion";
import { ActivityItem } from "./ActivityItem";
import {
  FONT_FAMILY,
  SLIDE_IN_DURATION,
  SLIDE_IN_INTERVAL,
} from "./HelloWorld/constants";
import { Activity } from "./Root";

export const ActivityList: React.FC<{ readonly activities: Activity[] }> = ({
  activities,
}) => {
  activities.sort((a, b) => {
    let res = new Date(a.begin).getTime() - new Date(b.begin).getTime();
    if (res === 0) {
      res = new Date(a.end).getTime() - new Date(b.end).getTime();
    }
    return res;
  });

  const activitiesPerDay: [string, number, Activity[]][] = [];
  let lastDay: string | null = null;
  let activityIndex = 0;
  activities.forEach((activity) => {
    const startDayName = new Date(activity.begin).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const endDayName = new Date(activity.end).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const day =
      startDayName + (endDayName !== startDayName ? ` - ${endDayName}` : "");
    if (day !== lastDay) {
      activitiesPerDay.push([day, activityIndex, []]);
      lastDay = day;
    }
    activitiesPerDay[activitiesPerDay.length - 1][2].push(activity);
    activityIndex++;
  });
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        width: "100%",
        // padding: 20,
        paddingTop: 10,
        boxSizing: "border-box",
      }}
    >
      {activitiesPerDay.map(([day, offset, dayActivities]) => {
        const dayStyle: React.CSSProperties = {
          fontFamily: FONT_FAMILY,
          fontWeight: 500,
          color: "white",
          paddingLeft: 40,
          fontSize: 60,
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        };
        const progress = spring({
          fps: videoConfig.fps,
          durationInFrames: SLIDE_IN_DURATION,
          frame: frame - (offset - 0) * SLIDE_IN_INTERVAL,
          config: {
            damping: 200,
            mass: 0.7,
          },
        });

        const titleStyle: CSSProperties = {
          transform: `translateY(${(progress - 1) * 20}%)`,
          opacity: progress,
        };

        return (
          <div key={day}>
            <h2 style={{ ...dayStyle, ...titleStyle }}>{day}</h2>
            {dayActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                activity={activity}
                delay={(offset + index) * SLIDE_IN_INTERVAL}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
