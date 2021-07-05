import React, { Component } from 'react'
import { Form, Icon, Input, message, Select,TimePicker} from 'antd'
const { Option } = Select;
const FormItem = Form.Item
@Form.create()
class SpiderConfigCreate extends Component {

  componentDidMount() {
    this.props.onRef(this)
  }

  handleSubmit = () => {
    const { form, dispatch, handleCancel,updateState } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue,
      }
      //将moment对象取其时间转化为字符串
      values.startTime =  values.startTime.format("HH:mm");
      dispatch({
        type: 'SpiderConfig/createSpider',
        payload: values,
      }).then(() => {
        message.success('新增爬虫任务成功！')
      })
      //新增数据
      handleCancel();
      updateState(values);
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('webSite', {
            rules: [{ required: true, message: '请选择爬取的网站!' }],
          })(
            <Select prefix={<Icon type="user"/>} placeholder="请选择爬取的网站">
              <Option value="wangyi">网易新闻</Option>
              <Option value="tengxun">腾讯新闻</Option>
              <Option value="souhu">搜狐新闻</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('startTime', {
            rules: [{ required: true, message: '请输入选择定时爬取的时间!' }],
          })(
            <TimePicker style = {{width : 352}}
                        placeholder="请输入选择定时爬取的时间"
                        format='HH:mm' />
          )}
        </FormItem>
      </Form>
    )
  }
}

// const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default SpiderConfigCreate
