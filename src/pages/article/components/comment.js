import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Comment, Avatar, Icon, Button, Tooltip, Input, message } from 'antd'
import Editor from '../components/Editor'
import { pathMatchRegexp } from 'utils'
import moment from 'moment'

const { TextArea } = Input


@connect(({ articleDetail }) => ({ articleDetail }))
export default class Comments extends React.Component {
  state = {
    curNeedReplyId: -1,
    commentsList: [],
  }


  handleClickReply = (item) => {
    this.setState({ curNeedReplyId: item.id })
  }

  /*
  * 回复评论后修改变量，使得评论框隐藏
  * */
  hiddenComment = () => {
    this.setState({ curNeedReplyId: -1 })
  }

  generateMenus = (data) => {
    const { curNeedReplyId } = this.state
    return (
      <div>
        {data.map((item) => {
          if (item.children) {
            return (
              <Comment
                actions={[
                  <span>
                    <Tooltip title="支持一下">
                      <Icon
                        type="like"
                        theme={item && item.like_count !== 0 ? 'filled' : 'outlined'}
                        onClick={this.like.bind(this,item)}
                      />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item && item.like_count}</span>
                  </span>
                 , <span key="comment-nested-reply-to"
                          onClick={this.handleClickReply.bind(this, item)}>吐槽回去</span>,
                ]}
                author={<a>{item.name} </a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={<p>{item.content}</p>}
                datetime={moment(item.created_time).format('YYYY-MM-DD HH:mm:ss')}
              >
                {curNeedReplyId && curNeedReplyId === item.id &&
                <Editor editorData={{ 'post_id': item.post_id, 'parent_id': item.id }}
                        hiddenComment={this.hiddenComment}/>}
                {this.generateMenus(item.children)}
              </Comment>
            )
          }
          return (
            <Comment
              actions={[
                <span>
                    <Tooltip title="支持一下">
                      <Icon
                        type="like"
                        theme={item && item.like_count !== 0 ? 'filled' : 'outlined'}
                        onClick={this.like.bind(this,item)}
                      />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item && item.like_count}</span>
                  </span>,
                <span key="comment-nested-reply-to"
                              onClick={this.handleClickReply.bind(this, item)}>吐槽回去</span>]}
              author={<a>{item.name}</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={<p>{item.content}</p>}
              datetime={moment(item.created_time).format('YYYY-MM-DD HH:mm:ss')}
            >
              {curNeedReplyId && curNeedReplyId === item.id &&
              <Editor editorData={{ 'post_id': item.post_id, 'parent_id': item.id }}
                      hiddenComment={this.hiddenComment}
              />}
            </Comment>
          )
        })}
      </div>
    )
  }

  like = ({id}) => {
    const {post_id} = this.props
    //先检验是否已点赞，通过localstroge检验
    //取出LocalStorage数据
    let storage = window.localStorage
    const stroge_str_data = storage.getItem("blog_like_data")
    //缓存里存的都是字符串，需要转化为对象
    let stroge_json_data = JSON.parse(stroge_str_data)
    //若数据不存在，则初始化空对象
    if(!stroge_json_data){
      stroge_json_data = {}
    }
    if(!stroge_json_data[post_id]){
      stroge_json_data[post_id] = {
        comment_id_arr: [],
        is_liked: false
      }
    }
    //检查当前文章是否已点赞
    const is_liked = this.check_comment_status(stroge_json_data,id,post_id)
    if(is_liked){
      //已点赞
      message.success("已经点过赞了呦~")
      return
    }else{
      //点赞评论
      this.props.dispatch({
        type: 'articleDetail/likeComment',
        payload: { id: id },
      }).then((res) => {
        if(res){
          stroge_json_data[post_id].comment_id_arr.push(id)
          storage.setItem("blog_like_data", JSON.stringify(stroge_json_data))
        }
      })
    }
  }

  check_comment_status(data, id, article_id) {
    //查询缓存里是否评论点赞布尔值为true
    try {
      return data[article_id].comment_id_arr.includes(id)
    }catch (e) {
      window.localStorage.clear()
      return false
    }
  }


  render() {
    const { commentsList, data } = this.props.articleDetail
    return (
      <div id={'comments'}>
        <h5>{`${data.comment_count} 评论数`}</h5>
        <Editor editorData={{ 'post_id': this.props.post_id }}/>
        {this.generateMenus(commentsList)}
      </div>
    )
  }
}

