import React from 'react'
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
  Util,
} from 'bizcharts'
import DataSet from '@antv/data-set'

export default class BasicLoopChart extends React.Component {
  render() {
    const { DataView } = DataSet
    const { Html } = Guide
     /*const data = [
       {
         x: "事例一",
         y: 40
       },
       {
         x: "事例二",
         y: 21
       }
     ];*/
    const data = this.props.LoopGraphData
    const dv = new DataView()
    dv.source(data).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent',
    })
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + "%"
          return val
        },
      },
    }
    const {height,innerRadius = 0,isShowLegend} = this.props;
    const COLORS = ["#ff7f0e", "#2ca02c"];
    return (
      <div>
        <Chart
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
        >
          <Coord type={'theta'} radius={0.75} innerRadius={innerRadius}/>
          <Axis name="percent"/>
          {isShowLegend &&
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          />}
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={["x", COLORS]}
            tooltip={[
              'x*percent',
              (x, percent) => {
                percent = (percent * 100).toFixed(2) + "%"
                return {
                  name: x == 1 ? '积极' : '消极',
                  value: percent,
                }
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label
              content="percent"
              formatter={(val, x) => {
                const name = x.point.x == 1 ? '积极' : '消极';
                return  name+ ': ' + val
              }}
            />
          </Geom>
        </Chart>
      </div>
    )
  }
}

