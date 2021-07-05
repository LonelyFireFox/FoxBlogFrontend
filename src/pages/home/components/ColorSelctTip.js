import React from 'react'
import PropTypes from 'prop-types'
import styles from '../index.less'
import classnames from 'classnames'

class ColorSelctTip extends React.Component {


  render() {
    return (
      <div id="config-panel" className={`${styles['config-panel']}  ${styles['d-none']} ${styles['d-lg-block']}`}>
        <div className={`${styles['panel-inner']}`}>
          <a id="config-trigger"
             className={`${styles['config-trigger']} ${styles['config-panel-hide']} ${styles['text-center']}`}
             href="#">
            <svg
              // className={`${styles['svg-inline--fa']} ${styles['fa-cog']} ${styles['fa-w-16']} ${styles['fa-spin']} ${styles['mx-auto']}`}
              className={styles['svg-set-color']}
              data-fa-transform="down-6" aria-hidden="true"
              focusable="false" data-prefix="fas" data-icon="cog" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512" data-fa-i2svg="" style={{ transform: '0.5em 0.875em' }}>
              <g transform="translate(256 256)">
                <g transform="translate(0, 192)  scale(1, 1)  rotate(0 0 0)">
                  <path fill="currentColor"
                        d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                        transform="translate(-256 -256)"></path>
                </g>
              </g>
            </svg>
          </a>
          <h5 className={styles['panel-title']}>Choose Colour</h5>
          <ul id="color-options" className={`${styles['list-inline']} ${styles['color-options']} ${styles['mb-0']}`}>
            <li className={`${styles['theme-1']} ${styles['active']} ${styles['list-inline-item']} `}><a
              data-style="assets/css/theme-1.css"
              href="#"></a>
            </li>
            <li className={`${styles['theme-2']} ${styles['list-inline-item']} `}><a data-style="assets/css/theme-2.css"
                                                                                     href="#"></a>
            </li>
            <li className={`${styles['theme-3']} ${styles['list-inline-item']} `}><a data-style="assets/css/theme-3.css"
                                                                                     href="#"></a>
            </li>
            <li className={`${styles['theme-4']} ${styles['list-inline-item']} `}><a data-style="assets/css/theme-4.css"
                                                                                     href="#"></a>
            </li>
            <li className={`${styles['theme-5']} ${styles['list-inline-item']} `}><a data-style="assets/css/theme-5.css"
                                                                                     href="#"></a>
            </li>
            <li className={`${styles['theme-6']} ${styles['list-inline-item']} `}><a data-style="assets/css/theme-6.css"
                                                                                     href="#"></a>
            </li>
            <li className={`${styles['theme-7']} ${styles['list-inline-item']} `}><a data-style="assets/css/theme-7.css"
                                                                                     href="#"></a>
            </li>
            <li className={`${styles['theme-8']} ${styles['list-inline-item']} `}><a data-style="assets/css/theme-8.css"
                                                                                     href="#"></a>
            </li>
          </ul>
          <a id="config-close" className={styles.close} href="#">
            <svg className={`${styles['svg-inline--fa']} ${styles['fa-times-circle ']}`}
                 aria-hidden="true" focusable="false" data-prefix="fa"
                 data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                 data-fa-i2svg="">
              <path fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
            </svg>
          </a>
        </div>
      </div>
    )
  }
}

ColorSelctTip.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default ColorSelctTip
