import React, { Suspense } from 'react'
import { Table, Row, Col, Tabs, Card,Input,message } from 'antd'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
import { DownOutlined } from '@ant-design/icons'
import SimpleTable from './components/SimpleTable'
import BasicLineChart from './components/BasicLineChart'
import moment from 'moment'
const { Search } = Input;
const { TabPane } = Tabs

@connect(({ HotTopic, loading }) => ({ HotTopic, loading }))
class HotTopic extends React.Component {
  state = {
    hotTopicData: [],
    newsData: [],
    laterOneDayNewsData: [],
    laterOneWeekNewsData: [],
    newsDataType: 1,//默认显示当天
    hotTopicTrendData: [],
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'HotTopic/getLatterHotTopicByDay',
      payload: { id: 7 },
    }).then((res) => {
      this.setState({ hotTopicData: res.list })
    })

    dispatch({
      type: 'HotTopic/getLatterNewsDataByDay',
      payload: { id: 1 },
    }).then((res) => {
      this.setState({ laterOneDayNewsData: res.list })
    })

    //TODO 话题展示应该和搜索栏关联起来
    dispatch({
      type: 'HotTopic/getLatterNewsDataByDay',
      payload: { id: 7 },
    }).then((res) => {
      this.setState({ laterOneWeekNewsData: res.list })
    })

    //TODO 这里默认显示了这两个
    dispatch({
      type: 'HotTopic/getTopicTrendData',
      payload: { key: '肺炎', day: '7' },
    }).then((res) => {
      this.setState({ hotTopicTrendData: res.data })
    })
  }

  onExpand = (expanded, record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'HotTopic/getNewsDataByClusterId',
      payload: { id: record.clusterId },
    }).then((res) => {
      // console.log("record.clusterId ===>> " , record.clusterId);
      this.setState({
        newsData: res.list,
      })
    })
  }

  expandedRowRender = (record) => {
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
      { title: '发布时间', dataIndex: 'newsDate', key: 'newsDate' },
    ]

    return <Table columns={columns} dataSource={this.state.newsData} pagination={false}/>
  }

  changeNewsData = (e) => {
    this.setState({
      newsDataType: e.target.value,
    })
  }

  /**
   * 根据关键字搜索相关话题结果
   * @param val
   */
  handleSearchTopic = (val) =>{
    // let arr = val.trim().split(/\s+/);
    if(val == ''){
      message.error('搜索栏不可为空!')
    }
    const {dispatch} = this.props;
    dispatch({//asdsad
      type: 'HotTopic/getTopicTrendData',
      payload: { key: val, day: '8'}, 
    }).then((res) => {
      this.setState({ hotTopicTrendData: res.data })
    })
  }


  render() {
    const {
      newsDataType,
      laterOneDayNewsData,
      laterOneWeekNewsData,
      hotTopicTrendData,
    } = this.state

    const columns = [
      { title: '话题内容', dataIndex: 'clusterContent', key: 'clusterContent' },
      {
        title: '话题创建时间', dataIndex: 'createTime', key: 'createTime',
        render: (newsDate) => {
          return (
            <span>
              {moment(parseInt(newsDate)).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          )
        },
      },
      { title: '话题热度', dataIndex: 'clusterHotValue', key: 'clusterHotValue' },
      { title: 'Action', key: 'operation', render: () => <a>查看更多</a> },
    ]

    const newsData = newsDataType === 1 ? laterOneDayNewsData : laterOneWeekNewsData

    return (
      <div>
        <Row gutter={24}>
          <Col xl={15} lg={16} sm={16} xs={16} style={{ marginBottom: 24 }}>
            <Suspense fallback={null}>
              <Card bordered={false}>
                <Tabs
                  tabBarStyle={{ marginBottom: 24 }}
                >
                  <TabPane tab="热点话题趋势" key="return">
                    <Search
                      placeholder="请输入话题查找"
                      style={{ width: 200 }}
                      onSearch={this.handleSearchTopic}
                      enterButton />
                    <BasicLineChart lineChartData={hotTopicTrendData}/>
                  </TabPane>
                </Tabs>
              </Card>
            </Suspense>
          </Col>

          <Col xl={9} lg={8} sm={8} xs={8} style={{ marginBottom: 12, height: 400 }}>
            <Suspense fallback={null}>
              <Card bordered={false}>
                <Tabs>
                  <TabPane tab="最热舆情">
                    <SimpleTable
                      data={newsData}
                      name="newsTitle"
                      flag = {1}
                      changeNewsData={this.changeNewsData}
                      type={newsDataType}
                      showHeader = {true}
                    />
                  </TabPane>
                </Tabs>
              </Card>
            </Suspense>
          </Col>
        </Row>

        <Card bordered={false}>
          <Tabs>
            <TabPane tab="话题展示">
              <Table
                rowKey={record => record.clusterId}
                className="components-table-demo-nested"
                columns={columns}
                dataSource={this.state.hotTopicData}
                onExpand={(expanded, record) => this.onExpand(expanded, record)}
                expandedRowRender={record => this.expandedRowRender(record)}
                expandRowByClick={true}
                pagination={{ position: 'bottom' }}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}


HotTopic.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default HotTopic
