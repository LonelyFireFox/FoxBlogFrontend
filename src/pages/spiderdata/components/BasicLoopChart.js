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
    /* const data = [
       {
         item: "事例一",
         count: 40
       },
       {
         item: "事例二",
         count: 21
       },
       {
         item: "事例三",
         count: 17
       },
       {
         item: "事例四",
         count: 13
       },
       {
         item: "事例五",
         count: 9
       }
     ];*/
    const data = this.props.LoopGraphData
    const dv = new DataView()
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
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
    const {height,innerRadius = 0} = this.props;
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
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-100}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={['50%', '50%']}
              html={"<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>总数据<br><span style=&quot;color:#262626;font-size:2.5em&quot;>"+this.props.total+"</span></div>"}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = (percent * 100).toFixed(2) + "%"
                return {
                  name: item,
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
              formatter={(val, item) => {
                return item.point.item + ': ' + val
              }}
            />
          </Geom>
        </Chart>
      </div>
    )
  }
}

