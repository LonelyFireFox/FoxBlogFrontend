import React from 'react'
import { connect } from 'dva/index'
import { Row , Col, Form, Button, message, Input } from 'antd'

const { TextArea } = Input

@Form.create()
@connect(({ articleDetail }) => ({ articleDetail }))
export default class Editor extends React.Component {

  state = {
    submitting: false,
    value: '',
    isShowUserForm: false,
  }

  componentDidMount() {

  }

  reQuery = ({ post }) => {
    const { hiddenComment, dispatch } = this.props
    dispatch({
      type: 'articleDetail/getCommentsByPostId',
      payload: { postId: post },
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
      const user = {'name':values.name,'email':values.email,'url':values.url}
      values = Object.assign(values,user)
      console.log("values ===>> " , values);
      dispatch({
        type: 'articleDetail/createComment',
        payload: values,
      }).then((res) => {
        if (res) {
          window.localStorage.setItem("blog_user_data", JSON.stringify(user))
          message.success('吐槽成功')
          this.reQuery(values)
          this.setState({
            submitting: false,
            isShowUserForm: false,
          })
          //清除textarea的内容
          form.setFieldsValue({content:''})
        } else {
          message.error('出问题了，联系博主！')
        }
      })

    })

  }


  handleTextFocus = (e) => {
    //聚焦时，若未输入昵称邮箱等信息，弹出输入栏
    const user = window.localStorage.getItem("blog_user_data")
    if (!user) {
      this.setState({ isShowUserForm: true })
    }
  }

  handleTextBlur = (e) =>{
    //文本域失去焦点时，隐藏个人信息栏
    this.setState({isShowUserForm:false})
  }

  getUserData = () =>{
    //取出LocalStorage数据
    let storage = window.localStorage
    const stroge_str_data = storage.getItem("blog_user_data")
    //缓存里存的都是字符串，需要转化为对象
    let stroge_json_data = JSON.parse(stroge_str_data)
    //若数据不存在，则初始化空对象
    if(!stroge_json_data){
      stroge_json_data = {}
    }
    return stroge_json_data
  }

  handleChangeUser = () =>{
    this.setState({isShowUserForm:!this.state.isShowUserForm})
  }

  render() {
    const { submitting, value, isShowUserForm } = this.state
    const { getFieldDecorator } = this.props.form
    const { editorData } = this.props
    //获取缓存的游客表单数据
    const user = this.getUserData()

    return (
      <Form  onSubmit={this.handleSubmit}>
        <Form.Item label="文章id" style={{ display: 'none' }}>
          {getFieldDecorator('post', {
            rules:
              [{ required: true, message: '文章id必填的呀!' }],
            initialValue: editorData && editorData.post_id,
          })
          (<Input/>)}
        </Form.Item>
        <Form.Item label="父id" style={{ display: 'none' }}>
          {getFieldDecorator('parent', {
            rules:
              [],
            initialValue: editorData && editorData.parent_id,
          })
          (<Input/>)}
        </Form.Item>
        {user && user.name &&
        <span><h6>{'你现在用的身份是：'+user.name+' 来吐槽吧！ '}</h6><a style={{color:'#16a085'}} onClick={this.handleChangeUser}>换个身份</a></span>}
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '评论内容必填的呀!' }],
          })(
            <TextArea rows={4} onChange={this.handleChange} onFocus={this.handleTextFocus} />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={submitting}
            type="primary"
          >
            吐槽
          </Button>
        </Form.Item>

        <Row gutter={24} style={{display:isShowUserForm? 'block':'none'}}>
          <Col span={6}>
            <Form.Item label="昵称">
              {getFieldDecorator('name', {
                rules:
                  [{ required: true, message: '阁下如何称呼！' }],
                  initialValue: user && user.name,
              })
              (<Input/>)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '邮箱格式不对！',
                  },
                  {
                    required: true,
                    message: '留下你的邮箱吧！',
                  },
                ],
                initialValue: user && user.email,
              })(<Input/>)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="网址">
            {getFieldDecorator('url', {
              rules:
                [{
                  type: 'url',
                  message: '网址格式不对！',
                }],
              initialValue: user && user.url
            })
            (<Input/>)}
          </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

