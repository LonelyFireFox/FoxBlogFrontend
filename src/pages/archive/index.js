import React from 'react'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
import { TimeLineCom } from 'components'

@connect(({ Archive }) => ({ Archive }))
class Archive extends React.Component {

  state = {
  }

  componentDidMount() {
  }

  render() {
    const {archiveData} = this.props.Archive
    console.log("archiveData ===>> " , archiveData);
    return (
        <TimeLineCom data={archiveData}/>
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
