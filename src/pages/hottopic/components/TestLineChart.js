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

class TestLineChart extends React.Component {
  render() {
    // const data = [
    //   {y: 20, x: "2020-04-04",city:'肺炎'},
    //   {y: 30, x: "2020-04-05",city:'肺炎' },
    //   {y: 30, x: "2020-04-06",city:'肺炎'},
    //   {y: 40, x: "2020-04-07",city:'肺炎'},
    //   {y: 50, x: "2020-04-08",city:'肺炎'},
    //   {y: 50, x: "2020-04-09",city:'肺炎'},
    //   {y: 80, x: "2020-04-10",city:'肺炎'},
    //   {y: 70, x: "2020-04-11",city:'肺炎'},
    //   {y: 75, x: "2020-04-12",city:'肺炎'},
    //   {y: 85, x: "2020-04-13",city:'肺炎'},
    //
    //   {y: 30, x: "2020-04-04",city:'国外疫情'},
    //   {y: 40, x: "2020-04-05",city:'国外疫情'},
    //   {y: 60, x: "2020-04-06",city:'国外疫情'},
    //   {y: 65, x: "2020-04-07",city:'国外疫情'},
    //   {y: 60, x: "2020-04-08",city:'国外疫情'},
    //   {y: 60, x: "2020-04-09",city:'国外疫情'},
    //   {y: 70, x: "2020-04-10",city:'国外疫情'},
    //   {y: 80, x: "2020-04-11",city:'国外疫情'},
    //   {y: 90, x: "2020-04-12",city:'国外疫情'},
    //   {y: 120, x: "2020-04-13",city:'国外疫情'},
    // ]

    const {
      height,data,color
    } = this.props;
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
          <Geom
            type="line"
            position="x*y"
            size={2}
            /*color={"topic"}*/
            color={color !== undefined && color.length > 0 ? ["topic",color] : 'topic'}
          />
          <Geom
            type="point"
            position="x*y"
            size={4}
            color={"topic"}
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

export default  TestLineChart;
