import React from "react";
import { Rect } from "react-konva";

class Rectangle extends React.Component {
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={6}
        height={12}
        fill={"#9335A3"}
        cornerRadius={4.69457}
        rotation={this.props.angle}
      />
    );
  }
}

export default Rectangle;