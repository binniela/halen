import { ImageResponse } from "next/og";

export const alt = "Halen — Aegean Sea Salt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(165deg, #1b3a8f 0%, #1f6f9a 48%, #46b6c4 100%)",
          color: "#fcfdfd",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 14,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Aegean Sea Salt
        </div>
        <div style={{ fontSize: 200, fontFamily: "serif", marginTop: 8 }}>
          Halen
        </div>
        <div style={{ fontSize: 30, opacity: 0.85, marginTop: 8 }}>
          Hand-harvested from the Greek coast
        </div>
      </div>
    ),
    { ...size }
  );
}
