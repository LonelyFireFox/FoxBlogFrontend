import React from 'react'
import { Tooltip, Icon, message } from 'antd'
import styles from '../../home/index.less'

export default class ArticleInfo extends React.Component {

  state = {}

  componentDidMount() {
  }

  /**
   {
     article_id :{
      comment_id: [],
       is_liked: true
     },
     article_id :{
      comment_id: [],
       is_liked: true
     },
   }
   */
  like = ({id}) => {
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
    if(!stroge_json_data[id]){
      stroge_json_data[id] = {
        comment_id_arr: [],
        is_liked: false
      }
    }
    //检查当前文章是否已点赞
    const is_liked = this.check_article_status(stroge_json_data,id)
    if(is_liked){
      //已点赞
      message.success("已经点过赞了呦~")
      return
    }else{
      //点赞文章
      this.props.dispatch({
        type: 'articleDetail/like',
        payload: { id: this.props.data.id },
      }).then((res) => {
        if(res){
          stroge_json_data[id].is_liked = true
          storage.setItem("blog_like_data", JSON.stringify(stroge_json_data))
        }
      })
    }
  }

  check_article_status(data, id) {
    //查询缓存里是否文章点赞布尔值为true
    try {
      return id in data && data[id].is_liked
    }catch (e) {
      window.localStorage.clear()
      return false
    }
  }

  render() {
    const { data, from } = this.props
    return (
      <div className={`${styles.item} ${styles['mb-5']}`} key={data && data.id}>
        <div className={styles.media}>
          <div className={styles['media-body']}>
            {/*<img
                    className={`${styles['mr-3']} ${styles['img-fluid']} ${styles['post-thumb']} ${styles['d-none']} ${styles['d-md-flex']}`}
                    src="../blog-post-thumb-1.jpg"
                    alt="image"/>*/}
            <h3 className={`${styles.title} ${styles['mb-1']}`}>
              {from && from === 'home'? <a href={`/article/${data.id}`}>{data && data.title}</a> : data && data.title}
            </h3>
            <div className={`${styles.meta} ${styles['mb-1']}`}>
              <Icon type="book" theme="filled" /> <span>{data && data.category ? data.category.name : '无'}</span>
              <Icon type="user" /><span>{data && data.author && data.author.username}</span>
              <Icon type="tags" theme="filled" /><span>
                {data && data.tags && data.tags.length>0 ?
                  data.tags.map(item => <span>{item.name}</span>)
                  : '无'
                }</span>
              <Icon type="calendar" /><span className="date">{data && data.created_time}</span>
              <Icon type="eye" theme="filled" /><span>{data && data.views} ℃</span>
              <Icon type="message" theme="filled" /><span><a href={(from && from === 'article_detail'?   '':'/article/'+ data.id) + '#comments'}> {data && data.comment_count}</a></span>
              {from && from === 'article_detail' &&(
                  <Tooltip title="支持一下">
                    <Icon
                      type="like"
                      theme={data && data.like_count !== 0 ? 'filled' : 'outlined'}
                      onClick={this.like.bind(this,data)}
                      spin
                    />
                    <span>{data && data.like_count}</span>
                  </Tooltip>
                )
              }
            </div>
            {from && from === 'home' &&
            <div className={styles.intro}>{data.excerpt}
            </div>
            }
            {from && from === 'home' && <a className={styles['more-link']}
                                           href={`/article/${data.id}`}>阅读更多
              →</a>}

          </div>
        </div>
      </div>
    )
  }
}
