import React from "react";

interface voteAverageRingProps {
  radius: number;
  stroke: number;
  progress: number;
  style?: React.CSSProperties;
}

class voteAverageRing extends React.Component<voteAverageRingProps> {
  private normalizedRadius: number;
  private circumference: number;

  constructor(props: voteAverageRingProps) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, progress, style } = this.props;
    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;
    const strokeColor = progress > 69 ? "#21D07A" : "yellow";

    return (
      <div
        style={{
          position: "relative",
          display: "inline-block",
          fontSize: ".75em",
        }}
      >
        <svg
          height="4em"
          width="4em"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          style={{ ...style, background: "black", borderRadius: "50%" }}
        >
          <circle
            stroke={strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${this.circumference} ${this.circumference}`}
            style={{
              strokeDashoffset,
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            color: "white",
            fontSize: "1em",
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    );
  }
}

export default voteAverageRing;
