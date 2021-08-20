import React from 'react'
import { Divider } from 'antd'
import { connect } from 'dva/index'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from '../index.less'
import ArticleInfo from '../../article/components/ArticleInfo'

@connect(({ Home, app, loading }) => ({ Home, app, loading }))
class RightMainPage extends React.Component {

  componentDidMount() {
  }

  renderArticleList = () => {
    const { articleData, app } = this.props
    const { count, previous, next, results } = articleData


    let elem = (
      <section className={`${styles['blog-list']} ${styles['px-3']} ${styles['py-5']} ${styles['p-md-5']}`}>
        <div className={styles.container}>
          {/*排序标签 START*/}
          {this.renderSortTag()}
          {/*排序标签 END*/}
          <hr/>
          {this.renderCountBar()}
          {
            results !== undefined && results.map(item => (
              <ArticleInfo dispatch={this.props.dispatch} data={item} from='home'/>
            ))
          }

          <nav className={`${styles['blog-nav']} ${styles.nav} ${styles['nav-justified']} ${styles['my-5']}`}>
            {previous && <a
              className={`${styles['nav-link-prev']} ${styles['nav-item']} ${styles['nav-link']} ${styles['rounded-left']}`}
              href={`/home?${previous && previous.indexOf('?') !== -1 ? previous.substr(previous.indexOf('?') + 1) : ''}`} /*onClick={this.handleClickPrevious.bind(this,previous)}*/>上一页
              <svg
                // className={`${styles['svg-inline--fa']} ${styles['fa-long-arrow-alt-left']} ${styles['fa-w-14']} ${styles['arrow-prev']}`}
                className={styles['svg-leftarrow-set']}
                focusable="false"
                data-prefix="fas" data-icon="long-arrow-alt-left" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                      d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path>
              </svg></a>
            }
            {next && <a
              className={`${styles['nav-link-next']} ${styles['nav-item']} ${styles['nav-link']} ${styles['rounded']} `}
              href={`/home?${next && next.substr(next.indexOf('?') + 1)}`} /*onClick={this.handleClickNext.bind(this,next)}*/>下一页
              <svg
                // className={`${styles['svg-inline--fa']} ${styles['fa-long-arrow-alt-right']} ${styles['fa-w-14']} ${styles['arrow-next']}`}
                className={styles['svg-rightarrow-set']}
                aria-hidden="true"
                focusable="false"
                data-prefix="fas" data-icon="long-arrow-alt-right" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                      d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"></path>
              </svg></a>}
          </nav>

        </div>
      </section>
    )

    return elem
  }

  handleClickPrevious(nextUrl) {
    //当第2页跳回第一页的时候需要特殊处理下，此时url并没有page=1，但可藉由url有值认定其为首页
    const ind = nextUrl.indexOf('=')

    const pageNum = ind !== -1 ? nextUrl.substr(ind + 1) : '1'
    if (pageNum) {
      this.props.dispatch({
        type: 'Home/getArticleListByPage',
        payload: { page: pageNum },
      })
    }
  }

  handleClickNext(nextUrl) {
    //处理获取其中的page值
    const pageNum = nextUrl.substr(nextUrl.indexOf('=') + 1)
    if (pageNum) {
      this.props.dispatch({
        type: 'Home/getArticleListByPage',
        payload: { page: pageNum },
      })
      /*.then(res => {
              this.setState({articleData:res})
            })*/
    }
  }

  renderCountBar = () => {
    const { app } = this.props
    const { locationQuery, categories, tags } = app
    let countBar
    if (locationQuery) {
      // if(locationPathname.indexOf('category') !== -1){
      if (locationQuery.category) {
        const obj = categories.find(item => item.id == locationQuery.category)
        // 此时显示当前分类文章统计信息
        countBar = (
          <div><span style={{ float: 'left' }}>{`当前分类：${obj.name}`}</span>
            <span style={{ marginLeft: '54%' }}>{`共${obj.num_posts}篇`}</span>
          </div>
        )
      } else if (locationQuery.tags) {
        const obj = tags.find(item => item.id == locationQuery.tags)
        // 此时显示当前标签文章统计信息
        countBar = (
          <div><span style={{ float: 'left' }}>{`当前标签：${obj.name}`}</span>
            <span style={{ marginLeft: '54%' }}>{`共${obj.num_posts}篇`}</span>
          </div>
        )
      }
    }
    return countBar
  }


  renderSortTag = () => {
    const { locationPathname, locationQuery } = this.props.app
    //拼接参数
    let param = locationPathname + '?'
    let ordering
    if (locationQuery) {
      if(locationQuery.ordering && Array.isArray(locationQuery.ordering)) {
        ordering = locationQuery.ordering[locationQuery.ordering.length-1]
      }else{
        ordering = locationQuery.ordering
      }
      for (let key of Object.keys(locationQuery)) {
        if(key !== 'ordering'){
          param += key + '=' + locationQuery[key] + '&'
        }
      }
    }
    const isSelectedTime = ordering && ordering === '-created_time'
    const isSelectedViews = ordering && ordering === '-views'
    return (
      <div>
        {isSelectedTime ?
          <span>按时间排序</span>
          :
          <a href={param + 'ordering=-created_time'}>按时间排序</a>
        }
        <Divider type="vertical"/>
        {isSelectedViews ?
          <span>按人气度排序</span>
          :
          <a href={param + 'ordering=-views'}>按人气度排序</a>
        }
      </div>
    )
  }


  render() {
    return (
      <div className={styles['main-wrapper']}>

        {/*文章列表 START*/}
        {this.renderArticleList()}
        {/*文章列表 END*/}
      </div>
    )
  }
}

RightMainPage.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default RightMainPage
