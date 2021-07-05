import React, { memo } from 'react'
import { Card, Tabs } from 'antd'
import TestLineChart from './TestLineChart'

const { TabPane } = Tabs
const BasicLineChart = memo(
  ({ activeKey, loading, lineChartData, color, selectDate, lineType }) => (

    <TestLineChart
      height={290}
      data={lineChartData}
      color = {color}
    />
  ),
)

export default BasicLineChart
