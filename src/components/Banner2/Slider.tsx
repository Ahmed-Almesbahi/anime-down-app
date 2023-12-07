import React, { useEffect, useState, useRef } from 'react'
import {
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import isEqual from 'lodash.isequal'
import styles from './styles'

const PAGE_CHANGE_DELAY = 4000

const Carousel = ({ children, ...props }) => {
  let size = { width: 0, height: 0 }

  const childrenLength = React.Children.count(props.children) || 1
  const [state, setState] = useState({
    currentPage: props.currentPage,
    size,
    childrenLength,
    contents: null,
  })
  let offset = 0
  let nextPage = 0
  const scrollView = useRef(null)

  useEffect(
    (children) => {
      if (state.childrenLength) {
        _setUpTimer()
      }
      _clearTimer()

      if (!isEqual(props.children, children)) {
        const { currentPage } = state
        _clearTimer()
        let childrenLength = 0
        if (children) {
          childrenLength = React.Children.count(children) || 1
        }
        const nextPage =
          currentPage >= childrenLength ? childrenLength - 1 : currentPage
        setState({ ...state, childrenLength }, () => {
          animateToPage(nextPage)
          _setUpTimer()
        })
      }
    },
    [props.children]
  )
  // console.log('state', state)

  const _setUpPages = () => {
    // const { isLooped, pageStyle } = props
    const { isLooped, pageStyle } = props
    const _children = React.Children.toArray(children)
    // const _children = React.Children.toArray(children)
    const pages = []

    if (_children && _children.length > 1) {
      // add all pages
      pages.push(..._children)
      // We want to make infinite pages structure like this: 1-2-3-1-2
      // so we add first and second page again to the end
      if (isLooped) {
        pages.push(_children[0])
        pages.push(_children[1])
      }
    } else if (_children) {
      pages.push(_children[0])
    } else {
      pages.push(
        <View>
          <Text>You are supposed to add children inside Carousel</Text>
        </View>
      )
    }
    return pages.map((page, i) => (
      <TouchableWithoutFeedback
        style={[{ ...state.size }, pageStyle]}
        key={`page${i}`}
      >
        {page}
      </TouchableWithoutFeedback>
    ))
  }

  // const getCurrentPage = () => {
  //   return state.currentPage
  // }

  const _setCurrentPage = (currentPage) => {
    setState({ ...state, currentPage }, () => {
      if (props.onAnimateNextPage) {
        // FIXME: called twice on ios with auto-scroll
        props.onAnimateNextPage(currentPage)
      }
    })
  }

  const _onScrollBegin = () => {
    _clearTimer()
  }

  const _onScrollEnd = (event) => {
    const offset = { ...event.nativeEvent.contentOffset }
    const page = _calculateCurrentPage(offset.x)
    _placeCritical(page)
    _setCurrentPage(page)
    _setUpTimer()
  }

  const _onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.x
    const direction = currentOffset > offset ? 'right' : 'left'
    offset = currentOffset
    const nextPage = _calculateNextPage(direction)
    if (nextPage !== nextPage) {
      nextPage = nextPage
      if (props.onPageBeingChanged) {
        props.onPageBeingChanged(nextPage)
      }
    }
  }

  const _onLayout = (event) => {
    const { height, width } = event.nativeEvent.layout
    setState({ ...state, size: { width, height } })
    // remove setTimeout wrapper when https://github.com/facebook/react-native/issues/6849 is resolved.
    setTimeout(() => _placeCritical(state.currentPage), 0)
  }

  const _clearTimer = (timer) => {
    clearTimeout(timer)
  }

  const _setUpTimer = () => {
    // only for cycling
    if (props.autoplay && React.Children.count(props.children) > 1) {
      const timer = setTimeout(_animateNextPage, props.delay)
      // _clearTimer(timer)
    }
  }

  const _scrollTo = ({ offset, animated, nofix }) => {
    if (scrollView) {
      scrollView.current.scrollTo({ y: 0, x: offset, animated })

      // Fix bug #50
      if (!nofix && Platform.OS === 'android' && !animated) {
        scrollView.current.scrollTo({ y: 0, x: offset, animated: true })
      }
    }
  }

  const _animateNextPage = () => {
    const { currentPage } = state
    const nextPage = _normalizePageNumber(currentPage + 1)

    // prevent from looping
    if (!props.isLooped && nextPage < currentPage) {
      return
    }
    animateToPage(nextPage)
  }

  const _animatePreviousPage = () => {
    const { currentPage } = state
    const nextPage = _normalizePageNumber(currentPage - 1)

    // prevent from looping
    if (!props.isLooped && nextPage > currentPage) {
      return
    }
    animateToPage(nextPage)
  }

  const animateToPage = (page) => {
    const {
      currentPage,
      childrenLength,
      size: { width },
    } = state
    const { isLooped } = props
    const nextPage = _normalizePageNumber(page)
    _clearTimer()
    if (nextPage === currentPage) {
      // pass
    } else if (nextPage === 0) {
      if (isLooped) {
        // animate properly based on direction
        if (currentPage !== childrenLength - 1) {
          _scrollTo({
            offset: (childrenLength + 2) * width,
            animated: false,
            nofix: true,
          })
        }
        _scrollTo({ offset: childrenLength * width, animated: true })
      } else {
        _scrollTo({ offset: 0, animated: true })
      }
    } else if (nextPage === 1) {
      // To properly animate from the first page we need to move view
      // to its original position first (not needed if not looped)
      if (currentPage === 0 && isLooped) {
        _scrollTo({ offset: 0, animated: false, nofix: true })
      }
      _scrollTo({ offset: width, animated: true })
    } else {
      // Last page is allowed to jump to the first through the "border"
      if (currentPage === 0 && nextPage !== childrenLength - 1) {
        _scrollTo({ offset: 0, animated: false, nofix: true })
      }
      _scrollTo({ offset: nextPage * width, animated: true })
    }
    _setCurrentPage(nextPage)
    _setUpTimer()
  }

  const _placeCritical = (page) => {
    const { isLooped } = props
    const {
      childrenLength,
      size: { width },
    } = state
    let offset = 0
    // if page number is bigger then length - something is incorrect
    if (page < childrenLength) {
      if (page === 0 && isLooped) {
        // in "looped" scenario first page shold be placed after the last one
        offset = childrenLength * width
      } else {
        offset = page * width
      }
    }

    _scrollTo({ offset, animated: false })
  }

  const _normalizePageNumber = (page) => {
    const { childrenLength } = state

    if (page === childrenLength) {
      return 0
    } else if (page > childrenLength) {
      return 1
    } else if (page < 0) {
      return childrenLength - 1
    }
    return page
  }

  const _calculateCurrentPage = (offset) => {
    const { width } = state.size
    const page = Math.round(offset / width)
    return _normalizePageNumber(page)
  }

  const _calculateNextPage = (direction) => {
    const { width } = state.size
    const ratio = offset / width
    const page = direction === 'right' ? Math.ceil(ratio) : Math.floor(ratio)
    return _normalizePageNumber(page)
  }

  const _renderPageInfo = (pageLength) => (
    <View
      style={[
        styles.pageInfoBottomContainer,
        props.pageInfoBottomContainerStyle,
      ]}
      pointerEvents='none'
    >
      <View style={styles.pageInfoContainer}>
        <View
          style={[
            styles.pageInfoPill,
            { backgroundColor: props.pageInfoBackgroundColor },
          ]}
        >
          <Text style={[styles.pageInfoText, props.pageInfoTextStyle]}>
            {`${state.currentPage + 1}${
              props.pageInfoTextSeparator
            }${pageLength}`}
          </Text>
        </View>
      </View>
    </View>
  )

  const _renderBullets = (pageLength) => {
    const bullets = []
    for (let i = 0; i < pageLength; i += 1) {
      bullets.push(
        <TouchableWithoutFeedback
          onPress={() => animateToPage(i)}
          key={`bullet${i}`}
        >
          <View
            style={
              i === state.currentPage
                ? [styles.chosenBullet, props.chosenBulletStyle]
                : [styles.bullet, props.bulletStyle]
            }
          />
        </TouchableWithoutFeedback>
      )
    }
    return (
      <View
        style={[styles.bullets, props.bulletsContainerStyle]}
        pointerEvents='box-none'
      >
        {bullets}
      </View>
    )
  }

  const _renderArrows = () => {
    let { currentPage } = state
    const { childrenLength } = state
    if (currentPage < 1) {
      currentPage = childrenLength
    }
    return (
      <View style={styles.arrows} pointerEvents='box-none'>
        <View
          style={[styles.arrowsContainer, props.arrowsContainerStyle]}
          pointerEvents='box-none'
        >
          <TouchableOpacity
            onPress={_animatePreviousPage}
            style={props.arrowStyle}
          >
            <Text style={props.leftArrowStyle}>
              {props.leftArrowText ? props.leftArrowText : 'Left'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_animateNextPage} style={props.arrowStyle}>
            <Text style={props.rightArrowStyle}>
              {props.rightArrowText ? props.rightArrowText : 'Right'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const contents = _setUpPages()

  const containerProps = {
    onLayout: _onLayout,
    style: [props.style],
  }
  return (
    <View {...containerProps}>
      <ScrollView
        ref={scrollView}
        onScrollBeginDrag={_onScrollBegin}
        onMomentumScrollEnd={_onScrollEnd}
        onScroll={_onScroll}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEnabled={props.swipe}
        contentContainerStyle={[
          styles.horizontalScroll,
          props.contentContainerStyle,
          {
            width:
              state.size.width *
              (state.childrenLength +
                (state.childrenLength > 1 && props.isLooped ? 2 : 0)),
            height: state.size.height,
          },
        ]}
      >
        {contents}
      </ScrollView>
      {props.arrows && _renderArrows(state.childrenLength)}
      {props.bullets && _renderBullets(state.childrenLength)}
      {props.pageInfo && _renderPageInfo(state.childrenLength)}
    </View>
  )
}

export default Carousel

Carousel.defaultProps = {
  delay: PAGE_CHANGE_DELAY,
  autoplay: true,
  pageInfo: false,
  bullets: true,
  arrows: true,
  pageInfoBackgroundColor: 'rgba(0, 0, 0, 0.25)',
  pageInfoTextSeparator: ' / ',
  currentPage: 0,
  style: undefined,
  pageStyle: undefined,
  contentContainerStyle: undefined,
  pageInfoTextStyle: undefined,
  pageInfoBottomContainerStyle: undefined,
  bulletsContainerStyle: undefined,
  chosenBulletStyle: undefined,
  bulletStyle: undefined,
  arrowsContainerStyle: undefined,
  arrowStyle: undefined,
  leftArrowStyle: undefined,
  rightArrowStyle: undefined,
  leftArrowText: '',
  rightArrowText: '',
  onAnimateNextPage: undefined,
  onPageBeingChanged: undefined,
  swipe: true,
  isLooped: true,
}
