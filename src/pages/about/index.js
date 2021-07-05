import React from 'react'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
import styles from '../home/index.less'

@connect(({ About, loading }) => ({ About, loading }))
class About extends React.Component {

  render() {
    const {About} = this.props
    const {aboutData} = About
    return (
      <div>
        <div dangerouslySetInnerHTML = {{__html:aboutData.body_html}}  ></div>

        {/*订阅，介绍 START*/}
        {/*<section className={styles['cta-section']} style={{textAlign:'center',fontWeight:'bold',paddingTop:'15%'}}>
          <div className={styles.container}>
            <div className={styles.intro}>欢迎订阅我，输入你的邮箱，就可以接收我的最新文章！</div>
            <form
              className={`${styles['form-inline']} ${styles['justify-content-center']} ${styles['pt-3']} ${styles['signup-form']}`}> signup-form
              <div className={`${styles['form-group']}`}>
                <label className={`${styles['sr-only']}`} htmlFor="semail">Your email</label>
                <input type="email" id="semail" name="semail1"
                       className={`${styles['form-control']} ${styles['mr-md-1']} ${styles['semail']}`}
                       placeholder="Enter email"/>
              </div>
              <button type="submit" className={`${styles.btn} ${styles['btn-primary']}`}>Subscribe</button>
            </form>
          </div>
        </section>*/}
        {/*订阅，介绍 END*/}
      </div>
    )
  }
}

About.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default About
