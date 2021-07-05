import React from 'react'
import { connect } from 'dva/index'
import { Row , Col, Form, Button, message, Input } from 'antd'

const { TextArea } = Input

@Form.create()
@connect(({ Treehole }) => ({ Treehole }))
export default class TreeHoleEditor extends React.Component {

  state = {
    submitting: false,
    value: '',
  }

  componentDidMount() {

  }

  reQuery = ({ post }) => {
    const { hiddenComment, dispatch } = this.props
    dispatch({
      type: 'Treehole/getTreeHole',
    }).then(() => {
      if (hiddenComment) {
        hiddenComment()
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      this.setState({
        submitting: true,
      })
      let values = {
        ...fieldsValue,
      }
      dispatch({
        type: 'Treehole/createTreeHole',
        payload: values,
      }).then((res) => {
        if (res) {
          message.success('记录成功，过去的让它过去，不要不开心了！')
          this.reQuery(values)
          this.setState({
            submitting: false,
          })
          //清除textarea的内容
          form.setFieldsValue({content:''})
        } else {
          message.error('出BUG了！')
        }
      })

    })

  }


  render() {
    const { submitting } = this.state
    const { getFieldDecorator } = this.props.form
    const { editorData } = this.props

    return (
      <Form  onSubmit={this.handleSubmit}>
        <Form.Item label="父id" style={{ display: 'none' }}>
          {getFieldDecorator('parent', {
            rules:
              [],
            initialValue: editorData && editorData.parent_id,
          })
          (<Input/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '有想说的话就说吧!' }],
          })(
            <TextArea rows={4} onChange={this.handleChange}  placeholder={'有想说的话就说吧,这里没有别人！'}/>,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={submitting}
            type="primary"
          >
            记录
          </Button>
        </Form.Item>

      </Form>
    )
  }
}

