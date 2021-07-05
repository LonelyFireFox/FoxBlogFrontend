import React from 'react'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
import RightMainPage from './components/RightMainPage'
import ColorSelctTip from './components/ColorSelctTip'


@connect(({ Home, loading }) => ({ Home, loading }))
class Home extends React.Component {

  componentDidMount() {

  }

  render() {
    const { articleData } = this.props.Home
    return (
      <div style={{marginTop: '-95px'}}>
        <RightMainPage articleData={articleData}/>
        {/*<ColorSelctTip />*/}
      </div>
    )
  }
}

Home.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default Home
