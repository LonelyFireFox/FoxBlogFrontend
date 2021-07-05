import React,{Suspense} from 'react'
import { Tag, Table, Row, Col, Tabs, Card, Input, message } from 'antd'
import { connect } from 'dva/index'
import moment from 'moment'
import BasicLineChart from '../hottopic/components/BasicLineChart'
import BasicLoopChart from '../sentimentanalysis/components/BasicLoopChart'

const { Search } = Input
const { TabPane } = Tabs

@connect(({ SentimentAnalysis, loading }) => ({ SentimentAnalysis, loading }))
class SentimentAnalysis extends React.Component {

  state = {
    newsData: [],
    topicEmotionTrendData : [], //话题情绪走势数据
    topicEmotionPropData : [], //话题情绪占比数据
  }

  componentDidMount() {
    const { dispatch } = this.props
    //默认显示最新的新闻文本
    dispatch({
      type: 'SentimentAnalysis/getLatterNewsDataSortByTime',
    }).then((res) => {
      this.setState({ newsData: res.list })
    })

    dispatch({
      type: 'SentimentAnalysis/getTopicEmotionTrendData',
      payload : {key : '特朗普',day : '7'}
    }).then((res) => {
      // console.log("res ===>> " , res);
      this.setState({ topicEmotionTrendData: res.trendData ,topicEmotionPropData : res.propData})
    })
  }

  /**
   * 根据关键字搜索相关话题结果
   * @param val
   */
  handleSearchTopic = (val) =>{
    if(val == ''){
      message.error('搜索栏不可为空!')
    }
    const {dispatch} = this.props;
    dispatch({
      type: 'SentimentAnalysis/getTopicEmotionTrendData',
      payload: { key: val, day: '7' }
    }).then((res) => {
      this.setState({
        topicEmotionTrendData:  res.trendData ,
        topicEmotionPropData : res.propData,
        newsData : res.newsData
      })
    })
  }

  render() {
    const columns = [
      { title: '新闻ID', dataIndex: 'newsId', key: 'newsId' },
      {
        title: '新闻标题', dataIndex: 'newsTitle', key: 'newsTitle',
        render: (text, value) => {
          return (
            <span className="table-operation">
             <a href={value.newsUrl}>{text}</a>
          </span>
          )
        },
      },
      {
        title: '发布时间', dataIndex: 'newsDate', key: 'newsDate',
        render: (newsDate) => {
          return (
            <span>
              {moment(parseInt(newsDate)).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          )
        },
      },
      {
        title: '情感倾向', dataIndex: 'newsEmotionValue', key: 'newsEmotionValue',
        render: (newsEmotionValue) => {
          //正向红色，负向绿色
          const color = newsEmotionValue == 1 ? 'volcano' : 'green'
          return (
            <Tag color={color}>
              {newsEmotionValue == 1 ? '积极' : '消极'}
            </Tag>
          )
        },
      },
    ]
    const {topicEmotionTrendData,topicEmotionPropData} = this.state;
    return (
      <div>
        <Row gutter={24}>
          <Col xl={16} lg={16} sm={16} xs={16} style={{ marginBottom: 24 }}>
            <Suspense fallback={null}>
              <Card bordered={false}>
                <Tabs
                  tabBarStyle={{ marginBottom: 24 }}
                >
                  <TabPane tab="话题情感倾向趋势" key="return">
                    <Search
                      placeholder="请输入话题查找"
                      style={{ width: 200 }}
                      onSearch={this.handleSearchTopic}
                      enterButton/>
                    <BasicLineChart color = {["#2ca02c", "#ff7f0e"]}lineChartData={topicEmotionTrendData}/>
                  </TabPane>
                </Tabs>
              </Card>
            </Suspense>
          </Col>

          <Col xl={8} lg={8} sm={8} xs={8} style={{ marginBottom: 24, height: 419 }}>
            <Suspense fallback={null}>
              <Card bordered={false}>
                <Tabs>
                  <TabPane tab="话题情感倾向分布">
                    <BasicLoopChart
                      LoopGraphData={topicEmotionPropData}
                      isShowLegend = {false}
                      height = {200}
                    />
                  </TabPane>
                </Tabs>
              </Card>
            </Suspense>
          </Col>
        </Row>

        <Card bordered={false}>
          <Tabs>
            <TabPane tab="新闻文本情感倾向">
              <Table
                columns={columns}
                dataSource={this.state.newsData}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default SentimentAnalysis
