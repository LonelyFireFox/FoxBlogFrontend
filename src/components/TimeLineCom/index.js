import React from 'react'
import { Timeline, Icon } from 'antd'

export default class TimeLineCom extends React.Component {

  renderTimeLine = () => {
    const { data } = this.props
   /*const data = [
      {
        2015: [{ title: 1, id: 3, created_time: '2021-6-20 23:30:49' }, {
          title: 1,
          id: 3,
          created_time: '2021-6-20 23:30:49',
        }],
      },
      {
        2016: [{ title: 'tryhet', id: 3, created_time: '2021-6-20 23:30:49' }, {
          title: 'qwfw',
          id: 3,
          created_time: '2021-6-20 23:30:49',
        }],
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
                height: '28px'}}>{Object.keys(item)[0]}</h5>{/*//这里取的是第一个key的字符串形式 */}
              <p></p>
              {
                item[Object.keys(item)[0]].map(val => (
                  <Timeline.Item>
                    <a href={'/article/'+val.id} style={{fontSize:'16px'}}>{val.title || ''} </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{fontSize:'14px'}}>{val.created_time || ''} </span>
                  </Timeline.Item>
                ))
              }
            </Timeline.Item>

          )
        })}
      </Timeline>
    )

  }

  render() {
    return (
      <div>
        {this.renderTimeLine()}
      </div>
    )
  }
}
