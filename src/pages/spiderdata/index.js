import PropTypes from 'prop-types'
import { connect } from 'dva'
import React, { Suspense } from 'react'
import { Row, Col, Tabs, Card } from 'antd'
import BasicLineChart from './components/BasicLineChart'
import { withI18n } from '@lingui/react/index'
import BasicLoopChart from './components/BasicLoopChart'
import SimpleTable from '../hottopic/components/SimpleTable'

const { TabPane } = Tabs

@withI18n()
@connect(({ spiderdata, loading }) => ({ spiderdata, loading }))
class spiderdata extends React.Component {
  state = {
    returnType: 'threeMonth',
    brrowAndReceiveType: 'threeMonth',
    configs: [],
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'spiderdata/fetchSpiderData',
      payload : {day : 15}
    }).then((res) => {
      // console.log('res==>>', res)
    })
    dispatch({
      type: 'spiderdata/getPreWarned'
    }).then((res) => {
    })
  }


  handleTabChangeForBar = e => {
    //根据点击内容，获取对应数据并刷新state
    this.setState({
      brrowAndReceiveType: e.target.value,
    })
  }


  handleTabChange = e => {
    //根据点击内容，获取对应数据并刷新state
    this.setState({
      returnType: e.target.value,
    })
  }


  countGraphData = (val) => {
    // const loopGraphData = new Object()
    let sum = 0
    for (let i in val) {
      sum += val[i].y
    }
    return sum
  }


  transGraphData = (val) => {
    let arr = []
    for (let i in val) {
      arr.push({ item: val[i].x, count: val[i].y })
    }
    return arr
  }



  render() {
    const { rangePickerValue, returnType } = this.state
    const { chartData,preWarnedData } = this.props.spiderdata
    if (chartData != undefined) {
      //进行x、y坐标的转换
      const {
        spiderDataFiveDays,
        totalNewsData,
        fiveNewstData,
      } = chartData
      const {list} = preWarnedData;

      //资产概况数据计算出百分比传给组件
      const loopGraphData = this.transGraphData(totalNewsData)
      const totalNewsNum = this.countGraphData(totalNewsData)

      return (

        <div>
          <Row gutter={24}>
            <Col xl={24} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Suspense fallback={null}>
                <BasicLineChart
                  lineType={returnType}
                  lineChartData={spiderDataFiveDays}
                  handleTabChange={this.handleTabChange}
                />
              </Suspense>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Suspense fallback={null}>
                <Card bordered={false}>
                  <Tabs>
                    <TabPane tab="数据采集总情况">
                      <BasicLoopChart
                        rangePickerValue={rangePickerValue}
                        LoopGraphData={loopGraphData}
                        total={totalNewsNum}
                        selectDate={this.selectDate}
                        height={200}
                        innerRadius = {0.6}
                      />
                    </TabPane>
                  </Tabs>
                </Card>
              </Suspense>
            </Col>

            <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Suspense fallback={null}>
                <Card bordered={false}>
                  <Tabs>
                    <TabPane tab="最新舆情">
                      <SimpleTable
                        data={fiveNewstData}
                        name="newsTitle"
                        isShowTab={false}
                        showHeader = {false}
                      />
                    </TabPane>
                  </Tabs>
                  <Tabs>
                    <TabPane tab="舆情预警">
                      <SimpleTable
                        data={list}
                        name="preWarningContent"
                        isShowTab={false}
                        showHeader = {false}
                      />
                    </TabPane>
                  </Tabs>
                </Card>
              </Suspense>
            </Col>
          </Row>

        </div>


      )
    }

  }

}

spiderdata.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default spiderdata
