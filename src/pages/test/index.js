import React from 'react'
import { Button } from 'antd'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
@connect(({ test, loading }) => ({ test, loading }))
class test extends React.Component {

  handleClick =()  => {

    alert(1)
    const { dispatch } = this.props

    dispatch({
      type: 'test/test',
    }).then((data) => {
      alert(data)
    })
  }

  render() {
    return (
      <div>
        <h1>qwdqw</h1>
        <Button type="primary" onClick={this.handleClick}>Primary</Button>
      </div>
    )
  }
}

test.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default test;
