import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page} from 'components'
import styles from '../../home/index.less'
import Comments from "../components/comment"
import ArticleInfo from "../components/ArticleInfo"

@connect(({ articleDetail }) => ({ articleDetail }))
class ArticleDetail extends PureComponent {

  render() {
    const { articleDetail, dispatch } = this.props
    const { data } = articleDetail

    return (
      <div>
        {/*-------------文章相关信息栏 START------------*/}
        <ArticleInfo data={data} dispatch={dispatch} from={'article_detail'} />
        {/*-------------文章相关信息栏 END------------*/}
        <div dangerouslySetInnerHTML = {{__html:data.body_html}} ></div>

        {/*-------------下一篇or上一篇文章 START------------*/}
        <nav className={`${styles['blog-nav']} ${styles.nav} ${styles['nav-justified']} ${styles['my-5']}`}>
          {data && data.id && data.id > 1 && <a
            className={`${styles['nav-link-prev']} ${styles['nav-item']} ${styles['nav-link']} ${styles['rounded-left']}`}
            href={`/article/${data.id-1}`} >Previous
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
          {/* TODO 这个判断还是有问题的，后续解决，如何保证翻到最后一篇文章的情况下，不出现next*/}
          {data && data.id && data.id > 0 && <a
            className={`${styles['nav-link-next']} ${styles['nav-item']} ${styles['nav-link']} ${styles['rounded']} `}
            href={`/article/${data.id+1}`} >Next
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
        {/*-------------下一篇or上一篇文章 END------------*/}

        {/*-------------评论 START------------*/}
        <Comments post_id={data.id}/>
        {/*-------------评论 END------------*/}
      </div>
    )
  }
}

ArticleDetail.propTypes = {
  articleDetail: PropTypes.object,
}

export default ArticleDetail
