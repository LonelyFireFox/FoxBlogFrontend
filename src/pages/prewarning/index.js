import React from 'react'
import { Button, Table, Modal, message, Divider,Tag } from 'antd'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
import PreWarningCreate from './components/PreWarningCreate'
import PreWarningUpdate from './components/PreWarningUpdate'

@connect(({ PreWarning, loading }) => ({ PreWarning, loading }))
class PreWarning extends React.Component {

  state = {
    modalVisible: false,
    modalType: '',
    modalId: '',
    curItem: null,
    selectedRowKeys: [],
    selectedStates: [],
    warnLoading: false,
    repealLoading: false,
    deleteLoading: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'PreWarning/getAll',
    }).then((res) => {
    })
  }

  //发布舆情预警
  handleWarn = () => {
    //检验一下
    if (!this.validateState(this.state.selectedStates, '1')) {
      message.info('请选择未发布的记录！')
      return
    }
    const { dispatch } = this.props
    dispatch({
      type: 'PreWarning/warnMore',
      payload: { ids: this.state.selectedRowKeys.toString() },
    }).then(() => {
      message.success('发布预警成功！')
      this.reQuery()
    })
    this.setState({ warnLoading: true })
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        selectedStates: [],
        warnLoading: false,
      })
    }, 1000)
  }

  //撤销舆情预警
  handleRepeal = () => {
    if (!this.validateState(this.state.selectedStates, '0')) {
      message.info('请选择未撤销的记录！')
      return
    }
    const { dispatch } = this.props
    dispatch({
      type: 'PreWarning/repealMore',
      payload: { ids: this.state.selectedRowKeys.toString() },
    }).then(() => {
      message.success('撤销预警成功！')
      this.reQuery()
    })
    this.setState({ repealLoading: true })
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        selectedStates: [],
        repealLoading: false,
      })
    }, 1000)

  }

  //批量删除
  handleDelete = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'PreWarning/deleteMore',
      payload: { ids: this.state.selectedRowKeys.toString() },
    }).then(() => {
      message.success('删除预警成功！')
      this.reQuery()
    })
    this.setState({ deleteLoading: true })
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        selectedStates: [],
        deleteLoading: false,
      })
    }, 1000)

  }

  validateState = (arr, val) => {
    for (let a of arr) {
      if (a === val) {
        return false
      }
    }
    return true
  }


  handleAddPreWarnTask = () => {
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
    this.child.handleSubmit()
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
    this.props.dispatch({
      type: 'PreWarning/getAll',
    })
  }


  handleEdit = (val) => {
    this.setState({ curItem: val })
    this.showModal('edit')
  }

  renderAddModal = () => {
    const { modalType, modalId, modalVisible, curItem } = this.state
    const { dispatch } = this.props
    let modal
    if (modalType === 'add') {
      modal = (
        <Modal
          key={modalId}
          title={`新增舆情预警`}
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
          <PreWarningCreate
            onRef={this.onRef}
            wrappedComponentRef={this.formRef}
            ref="getFormVlaue"
            reQuery={this.reQuery}
            dispatch={dispatch}
            handleCancel={this.handleCancel}
          />

        </Modal>

      )
    } else if (modalType === 'edit') {
      modal = (
        <Modal
          key={modalId}
          title={`修改舆情预警`}
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
          <PreWarningUpdate
            onRef={this.onRef}
            wrappedComponentRef={this.formRef}
            ref="getFormVlaue"
            reQuery={this.reQuery}
            dispatch={dispatch}
            handleCancel={this.handleCancel}
            curItem={curItem}
          />

        </Modal>

      )
    }
    return modal
  }

  onSelectChange = (selectedRowKeys, record) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys)
    let preWarningStates = []
    record.forEach(val => preWarningStates.push(val.preWarningState))
    // console.log('preWarningState ===>> ', preWarningStates)
    this.setState({ selectedRowKeys, selectedStates: preWarningStates })
  }


  render() {
    const { preWarningData } = this.props.PreWarning
    const columns = [
      {
        title: '预警内容',
        dataIndex: 'preWarningContent',
        key: 'preWarningContent',
        render: text => <a>{text}</a>,
      },
      {
        title: '创建时间',
        dataIndex: 'preWarningDate',
        key: 'preWarningDate',
      },
      {
        title: '预警状态',
        dataIndex: 'preWarningState',
        key: 'preWarningState',
        render: (preWarningState) => {
          //0:已撤销，1:已发布，2: 未发布
          const color = preWarningState == '0' ? 'geekblue' : (preWarningState == '1' ?'green':'blue');
          return (
            <Tag color={color}>
              {preWarningState == 0 ? '已撤销' :(preWarningState == 1 ?'已发布':'未发布')}
            </Tag>
          )
        }
      },
      {
        title: '预警等级',
        dataIndex: 'preWarningLevel',
        key: 'preWarningLevel',
        render: (preWarningLevel) => {
          const color = preWarningLevel == '1' ? '#8B0000' : (preWarningLevel == '2' ?'#FF6A6A':'#FF3030');
          return (
            <Tag color={color}>
              {preWarningLevel == '1' ? '一级' :(preWarningLevel == '2' ?'二级':'三级')}
            </Tag>
          )
        }
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <span>
            <a onClick={() => this.handleEdit(record)}>修改</a>
          </span>
          )
        },
      },
    ]
    const { list } = preWarningData
    const { warnLoading,repealLoading,deleteLoading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.handleAddPreWarnTask}>新增舆情预警</Button>
          <Divider type="vertical"/>
          <Button type="primary" onClick={this.handleWarn} disabled={!hasSelected} loading={warnLoading}>
            发布舆情预警
          </Button>
          <Divider type="vertical"/>
          <Button type="primary" onClick={this.handleRepeal} disabled={!hasSelected} loading={repealLoading}>
            撤销舆情预警
          </Button>
          <Divider type="vertical"/>
          <Button type="primary" onClick={this.handleDelete} disabled={!hasSelected} loading={deleteLoading}>
            删除舆情预警
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ''}
          </span>
        </div>
        <Table
          rowKey={record => record.preWarningId}
          columns={columns}
          dataSource={list}
          rowSelection={rowSelection}
        />
        {this.renderAddModal()}
      </div>
    )
  }
}

PreWarning.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default PreWarning
