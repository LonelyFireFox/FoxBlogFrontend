import React from 'react'
import { Popover, Button } from 'antd'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
import styles from '../index.less'
import head_img_src from '../../../../public/img/head_img_1.jpg'
import wechat_qrcode_src from '../../../../public/img/wechat_qrcode_1.jpg'

class LeftPersonalIntro extends React.Component {

  state = {
    categories: [],
    tags: [],
    isShowImage: -1, // -1不显示，1显示微信码，todo:2显示github？，。。？
  }

  componentDidMount() {
  }

  isShowDisplayCode = (val) => {
    this.setState({ isShowImage: val === this.state.isShowImage ? -1 : val })
  }

  render() {
    const { categories, tags } = this.props.app
    const { isShowImage } = this.state
    const categoriesContent = (
      <div>
        {
          categories.map(item => (<p><a href={`/home?category=${item.id}`}>{`${item.name}(${item.num_posts})`}</a></p>))
        }
      </div>
    )
    const tagsContent = (
      <div>
        {
          tags.map(item => (<p><a href={`/home?tags=${item.id}`}>{`${item.name}(${item.num_posts})`}</a></p>))
        }
      </div>
    )
    return (
      <header className={`${styles.header} ${styles['text-center']}`}>
        <h1 className={`${styles['blog-name']} ${styles['pt-lg-4']} ${styles['mb-0']}`}><a
          href="/home">LonelyFireFox's
          Blog</a></h1>

        <nav className={`${styles.navbar} ${styles['navbar-expand-lg']} ${styles['navbar-dark']}`}>

          <button className={`${styles['navbar-toggler']}`} type="button" data-toggle="collapse"
                  data-target="#navigation"
                  aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`${styles['navbar-toggler-icon']}`}></span>
          </button>

          <div id="navigation" className={`${styles.collapse} ${styles['navbar-collapse']} ${styles['flex-column']}`}>
            <div className={`${styles['profile-section']} ${styles['pt-3']} ${styles['pt-lg-0']}`}>
              <img
                className={`${styles['profile-image']} ${styles['mb-3']} ${styles['rounded-circle']} ${styles['mx-autp']}`}
                src={head_img_src}
                alt="image"/>

              <div className={`${styles.bio} ${styles['mb-3']}`}> 这是一个属于自己的安静园地<br/>分享技术上、生活上的故事~~~

              </div>
              <ul
                className={`${styles['social-list']} ${styles['list-inline']} ${styles['py-3']} ${styles['mx-auto']}`}>
                <li className={`${styles['list-inline-item']}`} onClick={this.isShowDisplayCode.bind(this, 1)}>
                  <Popover  placement={'bottom'} content={<img src={wechat_qrcode_src} style={{ positive: 'fixed' }} width={200} height={200}/>}>
                    <a href="#">
                      {/* <svg
                      classname={` ${styles['svg-inline--fa']} ${styles['fa-twitter']} ${styles['fa-w-16']} ${styles['fa-fw']}`}
                      aria-hidden="true" focusable="false"
                      data-prefix="fab"
                      data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"
                      data-fa-i2svg="">
                      <path fill="currentcolor"
                            d="m459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>*/}
                      <svg
                        className={` ${styles['svg-inline--fa']} ${styles['fa-twitter']} ${styles['fa-w-16']} ${styles['fa-fw']}`}
                        t="1625243046626" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2227">
                        <path
                          d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z"
                          p-id="2228" fill="#16a085"></path>
                      </svg>
                    </a>
                  </Popover>
                </li>
                {/*<li className={`${styles['list-inline-item']}`}><a
                  href="http://demo.kangjingept.com:8020/cssthemes6/5.14ZF11/index.html#">
                  <svg className="svg-inline--fa fa-linkedin-in fa-w-14 fa-fw" aria-hidden="true" focusable="false"
                       data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM448 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448h-.1z"></path>
                  </svg>
                </a></li>
                <li className={`${styles['list-inline-item']}`}><a
                  href="http://demo.kangjingept.com:8020/cssthemes6/5.14ZF11/index.html#">
                  <svg className="svg-inline--fa fa-github-alt fa-w-15 fa-fw" aria-hidden="true" focusable="false"
                       data-prefix="fab" data-icon="github-alt" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 480 512" data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"></path>
                  </svg>
                </a></li>
                <li className={`${styles['list-inline-item']}`}><a
                  href="http://demo.kangjingept.com:8020/cssthemes6/5.14ZF11/index.html#">
                  <svg className="svg-inline--fa fa-stack-overflow fa-w-12 fa-fw" aria-hidden="true" focusable="false"
                       data-prefix="fab" data-icon="stack-overflow" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 384 512" data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                  </svg>
                </a></li>
                <li className={`${styles['list-inline-item']}`}><a
                  href="http://demo.kangjingept.com:8020/cssthemes6/5.14ZF11/index.html#">
                  <svg className="svg-inline--fa fa-codepen fa-w-16 fa-fw" aria-hidden="true" focusable="false"
                       data-prefix="fab"
                       data-icon="codepen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                       data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z"></path>
                  </svg>
                </a></li>*/}
              </ul>
              <hr/>
            </div>

            <ul className={`${styles['navbar-nav']} ${styles['flex-column']} ${styles['text-left']}`}>
              <li className={`${styles['nav-item'] }`}>
                <a className={`${styles['nav-link'] }`} href="/home">
                  <svg className={` ${styles['svg-set']}`} aria-hidden="true" focusable="false"
                       data-prefix="fas" data-icon="home" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512"
                       data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
                  </svg>
                  大本营 <span
                  className="sr-only"></span></a>
              </li>
              <li className={`${styles['nav-item'] }`}>
                <Popover content={categoriesContent} placement={'right'}>
                  <span className={`${styles['nav-link'] }`}
                  >
                    <svg t="1623509745945" className={` ${styles['svg-set']}`} viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2390" width="16" height="16"><path
                      d="M320 64 192 64C121.6 64 64 121.6 64 192l0 128c0 70.4 57.6 128 128 128l128 0c70.4 0 128-57.6 128-128L448 192C448 121.6 390.4 64 320 64zM768 64l-128 0C569.6 64 512 121.6 512 192l0 128c0 70.4 57.6 128 128 128l128 0c70.4 0 128-57.6 128-128L896 192C896 121.6 838.4 64 768 64zM320 512 192 512c-70.4 0-128 57.6-128 128l0 128c0 70.4 57.6 128 128 128l128 0c70.4 0 128-57.6 128-128l0-128C448 569.6 390.4 512 320 512zM768 512l-128 0c-70.4 0-128 57.6-128 128l0 128c0 70.4 57.6 128 128 128l128 0c70.4 0 128-57.6 128-128l0-128C896 569.6 838.4 512 768 512z"
                      p-id="2391" fill="#e6e6e6"></path></svg>
                    物以类聚</span>
                </Popover>
              </li>
              <li className={`${styles['nav-item'] }`}>
                <Popover content={tagsContent} placement={'right'}>
                  <span className={`${styles['nav-link'] }`}
                  >
                    <svg className={` ${styles['svg-set']}`} aria-hidden="true" focusable="false"
                         data-prefix="fas" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 384 512" data-fa-i2svg="">
                      <path fill="currentColor"
                            d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>
                    </svg>
                    标签</span>
                </Popover>
              </li>
              <li className={`${styles['nav-item'] }`}>
                <a className={`${styles['nav-link'] }`} href="/archive">
                  <svg className={` ${styles['svg-set']}`} aria-hidden="true" focusable="false"
                       data-prefix="fas" data-icon="home" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512"
                       data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
                  </svg>
                  卷宗 <span
                  className="sr-only"></span></a>
              </li>
              <li className={`${styles['nav-item'] }`}>
                <a className={`${styles['nav-link'] }`} href="/about">
                  <svg className={` ${styles['svg-set']}`} aria-hidden="true" focusable="false"
                       data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 448 512"
                       data-fa-i2svg="">
                    <path fill="currentColor"
                          d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                  关于我</a>
              </li>
            </ul>

            {/*<div className={` ${styles['my-2']} ${styles['my-md-3']}`}>
              <a className={`${styles.btn} ${styles['btn-primary']}`}
                 href="http://demo.kangjingept.com:8020/cssthemes6/5.14ZF11/index.html#"
                 target="_blank">Get in Touch</a>
            </div>*/}
          </div>
        </nav>
      </header>
    )
  }
}

LeftPersonalIntro.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default LeftPersonalIntro
