import React, { Component } from 'react'
import { Form, Icon, Input, message, Select, TimePicker } from 'antd'
const { Option } = Select
const FormItem = Form.Item

@Form.create()
class PreWarningUpdate extends Component {

  componentDidMount() {
    this.props.onRef(this);
    const { curItem, form, dispatch } = this.props;
    const values = this.handleData(curItem);
    form.setFieldsValue(values);
  }

  handleSubmit = () => {
    const { form, dispatch, reQuery } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue,
      }
      dispatch({
        type: 'PreWarning/updatePreWarning',
        payload: values,
      }).then(() => {
        message.success('修改预警信息成功！')
        reQuery()
      })

    })
  }

  handleData = (item) => {
    return {
      ...item
    };
  };


  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <FormItem label="主键" style={{ display: 'none' }}>
          {getFieldDecorator('preWarningId', {})(<Input />)}
        </FormItem>

        <FormItem label="预警创建内容">
          {getFieldDecorator('preWarningContent', {
            rules: [{ required: true, message: '请输入预警内容!' }],
          })(
            <Input placeholder="请输入预警内容"/>,
          )}
        </FormItem>
        <FormItem label="预警创建状态">
          {getFieldDecorator('preWarningState', {
            rules: [
              { required: true, message: '请选择预警状态!' }],
          })(
            <Select prefix={<Icon type="user"/>} placeholder="请选择预警状态">
              <Option value="0">撤销预警</Option>
              <Option value="1">预警</Option>
              <Option value="2">未预警</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="预警创建等级">
          {getFieldDecorator('preWarningLevel', {
            rules: [{ required: true, message: '请选择预警等级!' }],
          })(
            <Select prefix={<Icon type="user"/>} placeholder="请选择预警等级">
              <Option value="1">一级</Option>
              <Option value="2">二级</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="预警创建时间" style={{ display: 'none' }}>
          {getFieldDecorator('preWarningDate', {})(<Input />)}
        </FormItem>
        <FormItem label="创建时间" style={{ display: 'none' }}>
          {getFieldDecorator('createtime', {})(<Input />)}
        </FormItem>
      </Form>
    )
  }
}

export default PreWarningUpdate;

