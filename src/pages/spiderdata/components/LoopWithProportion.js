import React, {memo} from 'react';
import {Card, Radio,Tabs} from 'antd';
import {Pie} from '../../../components/Charts';
const {TabPane} = Tabs;

const LoopWithProportion = memo(
  ({dropdownGroup, salesType, LoopWithProportionData, handleChangeSalesType}) => (
    <Card
      bordered={false}
    >
      <Tabs  size="large">
        <TabPane tab="资产状态占比" >
          <Pie
            hasLegend
            data={LoopWithProportionData}
            height={270}
            lineWidth={4}
            style={{padding: '8px 0'}}
            inner={0}
          />
        </TabPane>
      </Tabs>
    </Card>
  )
);

export default LoopWithProportion;
