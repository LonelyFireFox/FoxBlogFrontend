import React, {memo} from 'react';
import {Radio, Card, Tabs} from 'antd';
import {Bar} from '../../../components/Charts';
import GroupedBar from './GroupedBar';
const {TabPane} = Tabs;

const BarChart = memo(
  ({barChartData, isActive, loading, selectDate, isSelect, barType, handleTabChangeForBar,fields}) => (
    <Card bordered={false} >
      {isSelect ?
        (<Tabs
          size="large"
          tabBarStyle={{marginBottom: 24}}
          tabBarExtraContent={
            <div>
              <Radio.Group value={barType} onChange={handleTabChangeForBar}>
                <Radio.Button value="oneYear">最近一年</Radio.Button>
                <Radio.Button value="halfYear">最近半年</Radio.Button>
                <Radio.Button value="threeMonth">最近三个月</Radio.Button>
              </Radio.Group>
            </div>
          }
        >
          <TabPane
            tab = "资产领用借用情况"
            key="UseSituation"
          >
            <GroupedBar
              height={300}
              data={barChartData} //todo 记得改名称{{type: "y"}}
              fields = {fields}
            />

          </TabPane>

        </Tabs>)
        :
        (<Tabs
          size="large"
          tabBarStyle={{marginBottom: 24}}
        >
          <TabPane
            tab="资产分类情况"
            key="UseSituation"
          >
            <Bar
              height={290}
              data={barChartData} //todo 记得改名称{{type: "y"}}
            />

          </TabPane>

        </Tabs>)
      }

    </Card>
  )
  )
  ;

export default BarChart;

