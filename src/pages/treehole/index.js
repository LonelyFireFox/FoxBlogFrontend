import React from 'react'
import { Timeline, Icon ,Divider } from 'antd'
import TreeHoleEditor from './component/TreeHoleEditor'
import moment from 'moment'
import styles from './index.less'
import { connect } from 'dva/index'

@connect(({ Treehole }) => ({ Treehole }))
class Treehole extends React.Component {

  state = {
    curNeedReplyId: -1,

  }

  componentDidMount() {
  }

  renderTimeLine = () => {
    const {treeHoleData} = this.props.Treehole
    const data = treeHoleData
    console.log("treeHoleData ===>> " , treeHoleData);
    /*const data = [
      {
        2015: [
          {
            content: 'aaa', id: 3, created_time: '2015-6-20 23:30:49', parent_id: null,
            children: [
              { content: 'aabb1', id: 33, created_time: '2021-6-20 23:30:49', parent_id: 3 },
              { content: 'aabb2', id: 34, created_time: '2021-6-20 23:30:49', parent_id: 3 },
            ],
          },
          { content: 'bbb', id: 6, created_time: '2021-6-20 23:30:49', parent_id: null },
        ],
      },
      {
        2016: [
          {
            content: 'afwef', id: 4, created_time: '2015-6-20 23:30:49', parent_id: null,
            children: [
              { content: 1, id: 44, created_time: '2021-6-20 23:30:49', parent_id: 4 },
              { content: 1, id: 45, created_time: '2021-6-20 23:30:49', parent_id: 4 },
            ],
          },
          { content: 1, id: 5, created_time: '2021-6-20 23:30:49', parent_id: null },
        ],
      },
    ]*/
    if (!data) {
      return
    }

    return (
      <Timeline>
        {data.map(item => {
          return (
            <Timeline.Item
              dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/>}
              color="red"
            >
              <h5 style={{
                color: 'white',
                backgroundColor: '#16a085',
                width: '84px',
                height: '28px',
              }}>{Object.keys(item)[0]}</h5>{/*//这里取的是第一个key的字符串形式 */}
              <p></p>
              {
                this.renderTimeLineItem(item[Object.keys(item)[0]])
              }
            </Timeline.Item>
          )
        })}
      </Timeline>
    )

  }

  renderTimeLineItem = (data) => {
    const { curNeedReplyId } = this.state
    if (!data) {
      return
    }
    return (
      <div>
        {data.map(item => {
          if (item.children) {
            return (
              <Timeline.Item>
                <a href={'#'} style={{ fontSize: '16px' }}>{item.content || ''} </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: '14px' }}>{item.created_time && moment(item.created_time).format('YYYY-MM-DD HH:mm:ss') || ''} </span>
                <span className={styles.spanStyles}  onClick={this.handleClickReply.bind(this, item)}>还有什么想说的</span>
                &nbsp;&nbsp;
                {curNeedReplyId && curNeedReplyId === item.id && <span className={styles.spanStyles} onClick={this.hiddenComment}>算了不想说</span>}
                <p></p>
                {curNeedReplyId && curNeedReplyId === item.id &&
                <TreeHoleEditor editorData={{ 'parent_id': item.id }}
                                hiddenComment={this.hiddenComment}/>}
                {this.renderTimeLineItem(item.children)}
              </Timeline.Item>
            )
          }
          return (
            <Timeline.Item>
              <div>
                <a href={'#'} style={{ fontSize: '16px' }}>{item.content || ''} </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: '14px' }}>{item.created_time && moment(item.created_time).format('YYYY-MM-DD HH:mm:ss') || ''} </span>
                <span  className={styles.spanStyles} onClick={this.handleClickReply.bind(this, item)}>还有什么想说的</span>
                &nbsp;&nbsp;
                {curNeedReplyId && curNeedReplyId === item.id && <span className={styles.spanStyles} onClick={this.hiddenComment}>算了不想说</span>}
                <p></p>
                {curNeedReplyId && curNeedReplyId === item.id &&
                <TreeHoleEditor editorData={{ 'parent_id': item.id }}
                                hiddenComment={this.hiddenComment}/>}
              </div>
            </Timeline.Item>
          )
        })}
      </div>)

  }


  handleClickReply = (item) => {
    this.setState({ curNeedReplyId: item.id })
  }

  hiddenComment = () => {
    this.setState({ curNeedReplyId: -1 })
  }

  render() {
    return (
      //+ 回复框 和相关接口
      <div>
        <TreeHoleEditor/>
        {this.renderTimeLine()}
      </div>
    )
  }
}

export default Treehole
