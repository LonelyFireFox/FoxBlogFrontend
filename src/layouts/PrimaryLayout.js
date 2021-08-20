/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout, Drawer } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { config, pathMatchRegexp, langFromPath } from 'utils'
import Error from '../pages/404Old'
import styles from './PrimaryLayout.less'
import store from 'store'
import LeftPersonalIntro from '../pages/home/components/LeftPersonalIntro'

const { Content } = Layout
const { Header, Bread, Sider } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { app, location, dispatch, children } = this.props
    const { theme, collapsed, notifications } = app
    const user = store.get('user') || {}
    const permissions = store.get('permissions') || {}
    const routeList = store.get('routeList') || []
    console.log("routeList ===>> " , routeList);
    const { isMobile } = this.state
    const { onCollapseChange } = this


    // Localized route name.

    const lang = langFromPath(location.pathname)
    const newRouteList =
      lang !== 'en'
        ? routeList.map(item => {
            const { name, ...other } = item
            return {
              ...other,
              name: (item[lang] || {}).name || name,
            }
          })
        : routeList

    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // Query whether you have permission to enter this page
    // const hasPermission = currentRoute
    //   ? permissions.visit.includes(currentRoute.id)
    //   : false

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')

    const headerProps = {
      menus,
      collapsed,
      notifications,
      onCollapseChange,
      // avatar: user.avatar,
      // username: user.username,
      fixed: config.fixedHeader,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
    }

    const siderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }

    return (
      <Fragment>
        <Layout>
          {/*{isMobile ? (
            <Drawer
              maskClosable
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              visible={!collapsed}
              placement="left"
              width={200}
              style={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false} />
            </Drawer>
          ) : (
            <Sider {...siderProps} />
          )}*/}
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            {/*<Header {...headerProps} />*/}

            <Content className={styles.content}>
              {/*<Bread routeList={newRouteList} />*/}
              <LeftPersonalIntro {...this.props}/>
              {children}
              {/*{hasPermission ? children : <Error /> }*/}
              {/*// todo 后续看这里能不能直接修改children的style属性,解决布局左偏问题*/}
            </Content>
            <BackTop />
            <GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />
          </div>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
