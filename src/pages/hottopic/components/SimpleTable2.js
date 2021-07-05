import React from 'react'
import { Button, Table, Radio } from 'antd'

class SimpleTable extends React.Component {

  renderAList = () => {
    const { data, name } = this.props
    let table
    const columns = [
      {
        title: name,
        dataIndex: name,
        key: name,
        render: (text, value) => {
          if(value.newsUrl == undefined){
            //TODO 预警首页使用的分支
            const preWarningLevel = value.preWarningLevel;
            const color = preWarningLevel == '1' ? '#8B0000' : (preWarningLevel == '2' ?'#FF6A6A':'#FF3030');
            return (<a style={{color : color}}>{text}</a>)
          }
          return (<a href={value.newsUrl}>{text}</a>)
        },
        width: 150,
        ellipsis: true,
      },
    ]


    table = (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={false}
        size={'small'}
      />
    )
    return table

  }

  render() {
    const { changeNewsData, type, isShowTab = true } = this.props
    return (

      <div>
        {isShowTab &&
        <div>
          <Radio.Group value={type} buttonStyle="solid" size="middle" onChange={changeNewsData}>
            <Radio.Button value={1}>每日</Radio.Button>
            <Radio.Button value={7}>每周</Radio.Button>
          </Radio.Group>
        </div>
        }
        {this.renderAList()}
      </div>
    )
  }
}

export default SimpleTable
