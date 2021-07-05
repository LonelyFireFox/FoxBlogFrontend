/**
 * Created by zhengyangjia on 2019/12/12.
 */
import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

class LineChart extends React.Component {
  render() {

    const cols = {
      y: {
        min: 0,
        minTickInterval: 1,
        alias: "数据量",
      },
      x: {
        range: [0, 1]
      }
    };
    const {
      data,height,lineFlag
    } = this.props;
    return (
      <div>
        <Chart height= {height}  data={data} scale={cols} forceFit>
          <Axis name="x" />
          <Axis name="y" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="x*y" size={2} color={lineFlag}/>
          <Geom
            type="point"
            position="x*y"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default LineChart;
