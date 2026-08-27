import React from "react";
import { FONT_FAMILY } from "./constants";

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

export const Title: React.FC<{
  readonly titleText: string;
}> = ({ titleText }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#2450A8",
        boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h1 style={{ ...title, ...word }}> {titleText}</h1>
    </div>
  );
};
