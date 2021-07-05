import React from 'react'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'


@connect(({ Archive, loading }) => ({ Archive, loading }))
class Archive extends React.Component {

  state = {
    articleData : {}
  }

  componentDidMount() {
    /*const { dispatch } = this.props
    const { pathname } = this.props.location
    const id = pathname.substr(pathname.lastIndexOf('/')+1)
    dispatch({
      type: 'Archive/getArticleById',
      payload: {id}
    }).then(res => {
      console.log("res ===>> " , res);
      this.setState({articleData : res})
    })*/
  }

  render() {
    return (
      <div style={{marginTop: '-95px'}}>
        <h3>213</h3>
      </div>
    )
  }
}

Archive.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default Archive
