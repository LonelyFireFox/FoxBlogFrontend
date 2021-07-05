import PropTypes from 'prop-types'
import { connect } from 'dva'
import React from 'react'
import { Button, Table, Modal, message } from 'antd'
import { withI18n } from '@lingui/react/index'
import SpiderConfigCreate from './components/SpiderConfigCreate'

@withI18n()
@connect(({ SpiderConfig, loading }) => ({ SpiderConfig, loading }))
class SpiderConfig extends React.Component {
  state = {
    modalVisible: false,
    modalType: '',
    modalId: '',
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'SpiderConfig/getCurrentSpiderList',
    }).then((res) => {
    })
  }

  //终止该爬虫任务
  handleClick = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'SpiderConfig/deleteSpiderById',
      payload: { id: record.spiderConfigId },
    }).then((res) => {
      message.success('停止爬虫任务成功！')
    })
    const { configData } = this.props.SpiderConfig
    const { configs } = configData
    let newConfigs = configs.filter(key => key.spiderConfigId !== record.spiderConfigId)
    let newConfigData  = JSON.parse(JSON.stringify(configData))
    newConfigData.configs = newConfigs;
    //新增属性
    dispatch({
      type: 'SpiderConfig/getCurrentSpiderListEnd',
      payload: newConfigData,
    })
  }
  //新增爬虫任务
  handleAddSpiderTask = () => {
    this.showModal('add')
  }


  showModal = (type) => {
    this.setState({
      modalVisible: true,
      modalType: type,
      modalId: Math.random(),
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  handleOk = () => {
    // console.log("this.child ===>> " , this.child);
    // console.log("this.props ===>> " , this.props);//TODO 为什么框架可以做到this.form.handleSubmit()待深究
    this.child.handleSubmit()
    const { dispatch } = this.props
    dispatch({
      type: 'SpiderConfig/getCurrentSpiderList',
    }).then((res) => {
    })

  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }


  onRef = (ref) => {
    this.child = ref
  }

  reQuery = () => {
    this.handleCancel()
    //刷新数据
  }

  //更新数据
  updateState = (val) => {
    const { dispatch } = this.props
    const { configData } = this.props.SpiderConfig
    const { configs } = configData
    console.log('configData Before===>> ', configData)
    // configs.push(val)
    console.log("configData After===>> " , configData);
    let newConfigData  = JSON.parse(JSON.stringify(configData))
    newConfigData.configs.push(val);
    //新增属性
    dispatch({
      type: 'SpiderConfig/getCurrentSpiderListEnd',
      payload: newConfigData,
    })
  }

  renderAddModal = () => {
    const { modalType, modalId, modalVisible } = this.state
    const { dispatch } = this.props
    let modal
    if (modalType === 'add') {
      modal = (
        <Modal
          key={modalId}
          title={`新增爬虫任务`}
          width={400}
          visible={modalVisible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="close" onClick={this.handleCancel}>
              关闭
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <SpiderConfigCreate
            onRef={this.onRef}
            wrappedComponentRef={this.formRef}
            ref="getFormVlaue"
            reQuery={this.reQuery}
            dispatch={dispatch}
            handleCancel={this.handleCancel}
            updateState = {this.updateState}
          />

        </Modal>

      )
    }
    return modal
  }


  render() {
    const { configData } = this.props.SpiderConfig
    const columns = [
      {
        title: '任务ID',
        dataIndex: 'spiderConfigId',
        key: 'spiderConfigId',
        render: text => <a>{text}</a>,
      },
      {
        title: '爬取网站',
        dataIndex: 'webSite',
        key: 'webSite',
      },
      {
        title: '任务时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: '进程',
        dataIndex: 'pid',
        key: 'pid',
      },
      {
        title: '操作',
        render: (text, record) => {
          const id = record.spiderConfigId
          return (
            <span>
            <a onClick={() => this.handleClick(record)}>取消任务</a>
              {/*<a onClick={this.handleClick(record)}>终止</a>*/}
          </span>
          )
        },
      },
    ]
    const { configs } = configData
    return (
      <div>
        <Button type="primary" onClick={this.handleAddSpiderTask}>新增爬虫任务</Button>
        {(configs != undefined && configs.length > 0) &&
        <Table columns={columns} dataSource={configs}/>
        }
        {this.renderAddModal()}
      </div>
    )
  }
}

SpiderConfig.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default SpiderConfig
