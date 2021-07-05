import React, {Component, Suspense} from 'react';
import {connect} from 'dva';
import {Row, Col } from 'antd';
import LoopWithProportion from './LoopWithProportion';
import BarChart from './BarChart';
import BasicLineChart from './BasicLineChart';
import LoopGraph from './LoopGraph';

@connect(({ zcstatistics }) => ({ zcstatistics }))
class ZcStatistics extends Component {
  state = {
    returnType: 'threeMonth',
    brrowAndReceiveType: 'threeMonth'
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'zcstatistics/fetchChartData',
    }).then((res) => {
      // console.log('res==>>', res);
    });

  }


  handleTabChangeForBar = e => {
    //根据点击内容，获取对应数据并刷新state
    this.setState({
      brrowAndReceiveType: e.target.value,
    });
  };


  handleTabChange = e => {
    //根据点击内容，获取对应数据并刷新state
    this.setState({
      returnType: e.target.value,
    });
  };

  isActive = type => {
    const {rangePickerValue} = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  countGraphData = (val) => {
    const loopGraphData = new Object();
    let sum = 0;
    for (let i in val) {
      sum += val[i].y;
    }
    for (let i in val) {
      if (val[i].x === '闲置') {
        loopGraphData.freePercent = Math.round(val[i].y / sum * 100);
      } else if (val[i].x === '在用') {
        loopGraphData.usePercent = Math.round(val[i].y / sum * 100);
      }
    }
    return loopGraphData;
  }


  convertDataToDoubleBar = (dataA, dataB) => {
    let result = [];
    let a = {};
    a["name"] = "领用";
    dataA.map(item => {
      a[item.x] = item.y
    });

    let b = {};
    b["name"] = "借用";
    dataB.map(item => {
      b[item.x] = item.y
    });
    result.push(a);
    result.push(b);
    // console.log("result==>>", result);

    return result;
  }

  render() {
    const {rangePickerValue, returnType, brrowAndReceiveType} = this.state;
    const {chartData} = this.props.zcstatistics;

    if (typeof chartData !== 'undefined') {
      // console.log("charData===>>", data);
      //进行x、y坐标的转换
      const {
        ZCStatusProportion,
        ZCClassify,
        ZCReturnYear,
        ZCReturnHalfYear,
        ZCReturnThreeMonths,
        ZCReceiveYear,
        ZCReceiveHalfYear,
        ZCReceiveThreeMonths,
        ZCBrrowYear,
        ZCBrrowHalfYear,
        ZCBrrowThreeMonths,
      } = chartData;

      //资产概况数据计算出百分比传给组件
      const loopGraphData = this.countGraphData(ZCStatusProportion);
      let ZCReturn = ZCReturnThreeMonths;
      if (returnType === 'halfYear') {
        ZCReturn = ZCReturnHalfYear;
      } else if (returnType === 'oneYear') {
        ZCReturn = ZCReturnYear;
      } else {
        //默认显示为三个月
        ZCReturn = ZCReturnThreeMonths;
      }

      //将数据转换为双柱形图的格式
      let ZCBrrowAndReceive;
      let fields = [];
      if (ZCReceiveThreeMonths != undefined) {
        if (brrowAndReceiveType === 'halfYear') {
          ZCReceiveHalfYear.map(item => {
            fields.push(item.x);
          });
          ZCBrrowAndReceive = this.convertDataToDoubleBar(ZCReceiveHalfYear, ZCBrrowHalfYear);

        } else if (brrowAndReceiveType === 'oneYear') {
          ZCReceiveYear.map(item => {
            fields.push(item.x);
          });
          ZCBrrowAndReceive = this.convertDataToDoubleBar(ZCReceiveYear, ZCBrrowYear);
        } else {
          //默认显示为三个月
          ZCReceiveThreeMonths.map(item => {
            fields.push(item.x);
          });
          ZCBrrowAndReceive = this.convertDataToDoubleBar(ZCReceiveThreeMonths, ZCBrrowThreeMonths);
        }
      }


      return (

        <div>
          <div>
            <Row gutter={24}>
              <Col xl={12} lg={24} sm={24} xs={24} style={{marginBottom: 24}}>
                <Suspense fallback={null}>
                  <LoopGraph
                    rangePickerValue={rangePickerValue}
                    LoopGraphData={loopGraphData}
                    isActive={this.isActive}
                    selectDate={this.selectDate}
                  />
                </Suspense>
              </Col>

              <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{marginBottom: 24}}>
                <Suspense fallback={null}>
                  <LoopWithProportion
                    LoopWithProportionData={ZCStatusProportion}
                  />
                </Suspense>
              </Col>
            </Row>
          </div>

          <div>
            <Row gutter={24} style={{marginBottom: 24}}>
              <Suspense fallback={null}>
                <BarChart
                  barChartData={ZCClassify}
                  isSelect={false}
                />
              </Suspense>
            </Row>
          </div>

          <div>
            <Row gutter={24}>
              <Col xl={12} lg={24} sm={24} xs={24} style={{marginBottom: 24}}>
                <Suspense fallback={null}>
                  <BarChart
                    barChartData={ZCBrrowAndReceive}
                    barType = {brrowAndReceiveType}
                    handleTabChangeForBar={this.handleTabChangeForBar}
                    isSelect={true}
                    fields = {fields}
                  />
                </Suspense>
              </Col>

              <Col xl={12} lg={24} sm={24} xs={24} style={{marginBottom: 24}}>
                <Suspense fallback={null}>
                  <BasicLineChart
                    lineType={returnType}
                    lineChartData={ZCReturn}
                    handleTabChange={this.handleTabChange}
                  />
                </Suspense>
              </Col>
            </Row>
          </div>

        </div>

      );
    }
  }
}
const mapStateToProps = ({zcstatistics}) => ({
  data: zcstatistics
});

export default connect(mapStateToProps)(ZcStatistics);
