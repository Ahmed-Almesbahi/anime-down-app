import React, { useState } from 'react'
import styles from './styles'
import { View, FlatList, Platform } from 'react-native'
import Item from './Item'
import DropDownList from '../DropDownList'
import Button from '../Button'
import Dimensions_ from '../Dimensions_'
import { useQuery } from '@apollo/client'
import { videoFilesQuery } from './graphql'
import Arrows from './Arrows'

const user = {
  id: '0233',
  favAnime: [
    '58694a0da1-471f-bd96-145571e2972',
    '58694a0f-3da1-471f-b96-145571e29d72',
  ],
}
const WIDTH = Dimensions_().width

const EpisodesList = ({
  _data,
  horizontal,
  title,
  navigation,
  openedDropDownList,
  closeDropDownList,
}) => {
  const [state, setState] = useState({ seasonId: 1, activeSlide: 0 })
  const { loading, error, data } = useQuery(videoFilesQuery, {
    variables: { videoId: parseInt(_data.video.id), seasonId: state.seasonId },
  })
  const slidersCount = data?.videoFiles.length ? data.videoFiles.length : null

  const selectedSeason = (selectedSeason: any) => {
    setState({ ...state, seasonId: selectedSeason + 1 })
  }
  const flatListRef = React.useRef()

  const itemCountPerRow = () => {
    let num
    switch (Dimensions_().widthName) {
      case 'xsmall':
        num = 2
        break
      case 'small':
        num = 3
        break
      case 'medium':
        num = 4
        break
      case 'large':
        num = 5
        break
      case 'xlarge':
        num = 6
        break
      case 'xxlarge':
        num = 7
        break
      case 'xxxlarge':
        num = 8
        break
      case 'largest':
        num = 9
        break
      default:
        num = 4
    }
    return num
  }

  const isfirstSlider = state.activeSlide === 0
  const isLastSlider =
    state.activeSlide <=
    -Math.floor(slidersCount / itemCountPerRow()) * itemCountPerRow()

  const itemWidth = (WIDTH * 0.9 - 10 * itemCountPerRow()) / itemCountPerRow()
  const itemWidth2 = (WIDTH * 0.9 - 0 * itemCountPerRow()) / itemCountPerRow()

  const goToSlide = (action) => {
    if (action === 'prev') {
      // used scrollToOffset instead of scrollToIndex due to a bug in ReactNative in Arabic
      setState({
        ...state,
        activeSlide: state.activeSlide + itemCountPerRow(),
      }),
        flatListRef.current.scrollToOffset({
          offset:
            itemWidth2 * itemCountPerRow() + state.activeSlide * itemWidth2,
        })
    } else if (action === 'next') {
      setState({
        ...state,
        activeSlide: state.activeSlide - itemCountPerRow(),
      }),
        flatListRef.current.scrollToOffset({
          offset:
            -itemWidth2 * itemCountPerRow() + state.activeSlide * itemWidth2,
        })
    }
  }

  return (
    <View style={styles.container}>
      {/* <View> */}

      <DropDownList
        onPressOutsideDropDownList
        openedDropDownList={openedDropDownList}
        closeDropDownList={closeDropDownList}
        style={Platform.OS !== 'web' ? { marginTop: 30 } : null}
        data={_data.seasons}
        selectedSeason={selectedSeason}
      />
      {!loading && !error ? (
        <>
          {/* </View> */}
          <View style={styles.titleSection}>
            {/* <View style={{ zIndex: 999, position: 'absolute' }} >
        </View> */}
            <Button mode='outlined' text={`${data.videoFiles.length}`} dark />
          </View>
          <View style={styles.shelfSection}>
            <FlatList
              contentContainerStyle={
                horizontal
                  ? { paddingHorizontal: '5%' }
                  : {
                      marginHorizontal: '5%',
                      justifyContent: 'center',
                    }
              }
              horizontal
              // numColumns={horizontal ? undefined : Platform.OS === 'web' ? num() : 2}
              // inverted={horizontal && Platform.OS !== 'web' ? true : false}
              // onContentSizeChange={() => {
              //   horizontal && Platform.OS === 'web'
              //     ? flatListRef.current.scrollToOffset(
              //       { offset: window.innerWidth * data.length, animated: true }
              //     ) : undefined
              // }}
              // getItemLayout={(data, index) => (
              //   { length: 416, offset: 416 * index, index })
              // }
              scrollEnabled={
                Dimensions_().isIsmallScreenOrSmaller && Platform.OS !== 'web'
              }
              initialNumToRender={itemCountPerRow()}
              ref={flatListRef}
              data={data.videoFiles}
              keyExtractor={(item) => item.id.toString()}
              // parseInt(_data.video.id, 10)
              removeClippedSubviews={false}
              renderItem={({ item, index }) => {
                // console.log('-----', index)
                return (
                  <Item
                    name={item.name}
                    // title={item.title}
                    videoId={item.id}
                    // story={item.description}
                    // episodesNo={index + 1}
                    // picture={item.picture}
                    // episodes={item.episodes}
                    // age={item.age}
                    // publicationYear={item.publicationYear}
                    // language={item.language}
                    // videoType={item.videoType}
                    // completed={item.completed}
                    // isFavourited={item.isFavourited}
                    // videoUrl={item.aws_url}
                    // VideoDetailsScreen={item.VideoDetailsScreen}
                    navigation={navigation}
                    width={itemWidth}
                    thumb={item.Thumb}
                    // width={
                    //   (Dimensions_().width * 0.9 - 10 * itemCountPerRow()) /
                    //   itemCountPerRow()
                    // }
                  />
                )
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      ) : null}
      {Platform.OS === 'web' && !Dimensions_().isIsmallScreenOrSmaller && (
        <>
          {/* {!isfirstSlider && console.log('33333')}
          {!isLastSlider && console.log('4444')} */}
          {!isfirstSlider && <Arrows isLeft={false} goToSlide={goToSlide} />}
          {!isLastSlider && <Arrows isLeft goToSlide={goToSlide} />}
        </>
      )}
    </View>
  )
}

export default EpisodesList
