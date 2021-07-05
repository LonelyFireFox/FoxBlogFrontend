import React, {memo} from 'react';
import {Row, Col, Card, Tabs} from 'antd';
import {Pie} from '../../../components/Charts';
const {TabPane} = Tabs;

const LoopGraph = memo(
  ({dropdownGroup, salesType, LoopGraphData, handleChangeSalesType}) => (
    <Card
      bordered={false}
    >
      <Tabs size="large">
        <TabPane tab="数据来源占比">
          <Row style={{padding: '16px 0'}}>
            <Col span={11}>
              <Pie
                animate={false}
                percent={LoopGraphData.tengxunPercent}
                total={LoopGraphData.tengxunPercent != undefined && LoopGraphData.tengxunPercent}
                subTitle={"腾讯"}
                height={260}
                lineWidth={2}
              />
            </Col >
            <Col span={11}>
              <Pie
                animate={false}
                color="#5DDECF"
                percent={LoopGraphData.wangyiPercent}
                subTitle={"网易"}
                total={LoopGraphData.wangyiPercent != undefined && LoopGraphData.wangyiPercent}
                height={260}
                lineWidth={2}
              />
            </Col >

            <Col span={11}>
              <Pie
                animate={false}
                color="#5DDECF"
                percent={LoopGraphData.xinlangPercent}
                subTitle={"新浪"}
                total={LoopGraphData.xinlangPercent != undefined && LoopGraphData.xinlangPercent}
                height={260}
                lineWidth={2}
              />
            </Col >
          </Row >
        </TabPane>
      </Tabs>
    </Card >
  )
);
export default LoopGraph;
