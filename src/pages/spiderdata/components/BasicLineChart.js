import React, {memo} from 'react';
import {Card, Tabs, Radio} from 'antd';
import LineChart from './LineChart';
/*数据示例
const datas = [
  {
    year: "1991",
    value: 3
  },
  {
    year: "1992",
    value: 4
  },
  {
    year: "1993",
    value: 3.5
  },
  {
    year: "1994",
    value: 5
  },
  {
    year: "1995",
    value: 4.9
  },
  {
    year: "1996",
    value: 6
  },
  {
    year: "1997",
    value: 7
  },
  {
    year: "1998",
    value: 9
  },
  {
    year: "1999",
    value: 13
  }
];*/
const {TabPane} = Tabs;
const BasicLineChart = memo(
  ({activeKey, loading, lineChartData, handleTabChange,selectDate,lineType}) => (
    <Card bordered={false}>
        <Tabs onChange={handleTabChange}
              tabBarStyle={{marginBottom: 24}}
             /* tabBarExtraContent={
                <div>
                  <Radio.Group value={lineType} onChange={handleTabChange}>
                    <Radio.Button value="oneYear">最近一年</Radio.Button>
                    <Radio.Button value="halfYear">最近半年</Radio.Button>
                    <Radio.Button value="threeMonth">最近三个月</Radio.Button>
                  </Radio.Group>
                </div>
              }*/
        >
            <TabPane tab="每日数据爬取情况"  key="return">
                <LineChart
                  height={290}
                  data={lineChartData}//
                />
            </TabPane>
        </Tabs>
    </Card>
  )
);

export default BasicLineChart;
