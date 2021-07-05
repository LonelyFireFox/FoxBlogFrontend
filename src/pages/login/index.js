import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {  Form, notification } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'

//--
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { preloadingImages } from '../../utils/utils'
import BGParticle from '../../utils/BGParticle'
//--
import styles from './index.less'


@withI18n()
@connect(({ loading }) => ({ loading }))
// @Form.create()
class Login extends PureComponent {

  state = {
    showBox: 'login',   //展示当前表单
    url: '',  //背景图片
    loading: false,
    loading2: false,
  }

  componentDidMount() {
    /*const isLogin = this.props.appStore
    if (isLogin) {
      this.props.history.go(1)     //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向上个页面
      // this.props.appStore.toggleLogin(false) //也可以设置退出登录
    }*/
    this.initPage()
    // preloadingImages(imgs)  //预加载下一个页面的图片，预加载了第二次为什么还会去请求图片资源？
  }

  componentWillUnmount() {
    this.particle && this.particle.destory()
    notification.destroy()
  }

  //载入页面时的一些处理
  initPage = () => {
   /* this.setState({
      loading: true,
    })
    // this.props.appStore.initUsers()
    this.loadImageAsync(url).then(url => {
      this.setState({
        loading: false,
        url,
      })
    }).then(() => {
      //为什么写在then里？id为backgroundBox的DOM元素是在loading为false时才有，而上面的setState可能是异步的，必须等到setState执行完成后才去获取dom
      this.particle = new BGParticle('backgroundBox')
      this.particle.init()
      notification.open({
        message: <ul>
          <li>初始账号：admin</li>
          <li>初始密码：admin</li>
        </ul>,
        duration: 0,
        className: 'login-notification',
      })
    })*/
  }
  //切换showbox
  switchShowBox = (box) => {
    this.setState({
      showBox: box
    })
  }

  //登录的背景图太大，等载入完后再显示，实际上是图片预加载，
  loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
      const image = new Image()
      image.onload = function() {
        resolve(url)
      }
      image.onerror = function() {
        console.log('图片载入错误')
      }
      image.src = url
    })
  }


  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const { showBox, loading } = this.state
    return (
      <div className={styles.loginPage}>
        {
          loading ?
            <div>
              <h3 className={styles.loadingTitle} /*className='animated bounceInLeft'*/>载入中...</h3>
            </div> :
            <div>
              <div id='backgroundBox' className={styles.backgroundBox} />
              <div className={styles.container}>
                {showBox === 'login' && <LoginForm
                  // className={showBox === 'login' ? styles.boxShowBox : boxHiddenBox}
                  dispatch={this.props.dispatch}
                  className={styles.box}
                  switchShowBox={this.switchShowBox}/>
                }
                {showBox === 'register' &&
                <RegisterForm className = {styles.box} switchShowBox={this.switchShowBox}/>}
              </div>
            </div>
        }
      </div>
    )
  }

  /* render() {
     const { loading, form, i18n } = this.props
     const { getFieldDecorator } = form
     let footerLinks = [
       {
         key: 'github',
         title: <Icon type="github"/>,
         href: 'https://github.com/zuiidea/antd-admin',
         blankTarget: true,
       },
     ]

     if (config.i18n) {
       footerLinks = footerLinks.concat(
         config.i18n.languages.map(item => ({
           key: item.key,
           title: (
             <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
           ),
         })),
       )
     }

     return (
       <Fragment>
         <div className={styles.form}>
           <div className={styles.logo}>
             <img alt="logo" src={config.logoPath}/>
             <span>{config.siteName}</span>
           </div>
           <form>
             <FormItem hasFeedback>
               {getFieldDecorator('username', {
                 rules: [
                   {
                     required: true,
                   },
                 ],
               })(
                 <Input
                   onPressEnter={this.handleOk}
                   placeholder={i18n.t`Username`}
                 />,
               )}
             </FormItem>
             <FormItem hasFeedback>
               {getFieldDecorator('password', {
                 rules: [
                   {
                     required: true,
                   },
                 ],
               })(
                 <Input
                   type="password"
                   onPressEnter={this.handleOk}
                   placeholder={i18n.t`Password`}
                 />,
               )}
             </FormItem>
             <Row>
               <Button
                 type="primary"
                 onClick={this.handleOk}
                 loading={loading.effects.login}
               >
                 <Trans>Sign in</Trans>
               </Button>
               <p>
                 <span>
                   <Trans>Username</Trans>
                   ：guest
                 </span>
                 <span>
                   <Trans>Password</Trans>
                   ：guest
                 </span>
               </p>
             </Row>
           </form>
         </div>
         <div className={styles.footer}>
           <GlobalFooter links={footerLinks} copyright={config.copyright}/>
         </div>
       </Fragment>
     )
   }*/
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}


export default Login
