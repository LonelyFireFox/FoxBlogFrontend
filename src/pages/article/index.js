import React from 'react'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'


@connect(({ Article, loading }) => ({ Article, loading }))
class Article extends React.Component {

  state = {
    articleData : {}
  }

  componentDidMount() {
    console.log(" article===>> " , );
    const { dispatch } = this.props
    const { pathname } = this.props.location
    console.log("pathname ===>> " , pathname);
    //从url中获取文章的id，进行数据访问
    const id = pathname.substr(pathname.lastIndexOf('/')+1)
    dispatch({
      type: 'Article/getArticleById',
      payload: {id}
    }).then(res => {
      console.log("res ===>> " , res);
      this.setState({articleData : res})
    })
  }

  render() {
    // const { articleData } = this.props.Home
    return (
      <div style={{marginTop: '-95px'}}>
        <h3>213</h3>
      </div>
    )
  }
}

Article.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default Article
