/**
 * Created by zhengyangjia on 2019/12/17.
 * 双（分组）柱形图
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
import DataSet from "@antv/data-set/build/data-set";


export default class GroupedBar extends React.Component {
  render() {
    /*示例数据格式
     const data = [
     {
     name: "London",
     "Jan.": 18.9,
     "Feb.": 28.8,
     "Mar.": 39.3,
     "Apr.": 81.4,
     "May": 47,
     "Jun.": 20.3,
     "Jul.": 24,
     "Aug.": 35.6
     },
     {
     name: "Berlin",
     "Jan.": 12.4,
     "Feb.": 23.2,
     "Mar.": 34.5,
     "Apr.": 99.7,
     "May": 52.6,
     "Jun.": 35.5,
     "Jul.": 37.4,
     "Aug.": 42.4
     }
     ];
     */

    const {data,fields,height} = this.props;
    const ds = new DataSet();
    let dv;
    if(data != undefined && fields != undefined  ){
      dv = ds.createView().source(data);
      // console.log(' ds.createView().source(data)==>>',data)
      dv.transform({
        type: "fold",
        fields: fields,
        // 展开字段集
        key: "月份", // key字段
        value: "月均降雨量" // value字段
      });
      // console.log(' dv==>>',dv)
    }


    return (
      <div>
        <Chart height={height} data={dv} forceFit>
          <Axis name="月份"/>
          <Axis name="月均降雨量"/>
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="月份*月均降雨量"
            color={"name"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}



