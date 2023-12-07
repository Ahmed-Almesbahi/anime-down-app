import React, { useState, useRef } from 'react'
import styles from './styles'
import { View, FlatList, Platform } from 'react-native'
import Item from './item'
import Dimensions_ from '../../components/Dimensions_'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Arrows from './Arrows'
import { useNavigation } from '@react-navigation/native'

const user = {
  id: '0233',
  favAnime: [
    '58694a0da1-471f-bd96-145571e2972',
    '58694a0f-3da1-471f-b96-145571e29d72',
  ],
}

interface Props {
  data: any
  horizontal?: boolean
  title?: string
  url?: string
}

const WIDTH = Dimensions_().width

const AnimeList: React.FC<Props> = ({ data, horizontal, title, url }) => {
  const slidersCount = data && data.length ? data.length : null
  const [state, setState] = useState({ activeSlide: 0 })
  const flatListRef = useRef(null)
  const navigation = useNavigation()

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
      setState({ activeSlide: state.activeSlide + itemCountPerRow() }),
        flatListRef.current.scrollToOffset({
          offset:
            itemWidth2 * itemCountPerRow() + state.activeSlide * itemWidth2,
        })
    } else if (action === 'next') {
      setState({ activeSlide: state.activeSlide - itemCountPerRow() }),
        flatListRef.current.scrollToOffset({
          offset:
            -itemWidth2 * itemCountPerRow() + state.activeSlide * itemWidth2,
        })
    }
  }
  return (
    <View style={styles.container}>
      {horizontal ? (
        <View style={styles.nameSection}>
          <Text style={styles.name}>{title}</Text>
          <Button
            // onPress={() => console.log('Pressed')}
            onPress={() => {
              // navigation.navigate(`${Launcher}`)
              // Platform.OS === 'web'
              // ? linkTo('/profile/jane')
              // :
              navigation.navigate('Category', {
                sort: url,
              })
              // navigation.navigate(`${url}`)
              // console.log('url', url, 'data', data[0].VideoDetailsScreen);
            }}
            mode='outlined'
            text='عرض الكل'
            dark
          />
        </View>
      ) : null}
      <View style={styles.shelfSection}>
        <FlatList
          contentContainerStyle={
            horizontal
              ? { paddingHorizontal: '5%' }
              : {
                  paddingHorizontal: '5%',
                  justifyContent: 'center',
                }
          }
          ref={flatListRef}
          horizontal={horizontal}
          numColumns={horizontal ? undefined : itemCountPerRow()}
          scrollEnabled={
            Dimensions_().isIsmallScreenOrSmaller && Platform.OS !== 'web'
          }
          getItemLayout={(data, index) => ({
            length: itemWidth2,
            offset: itemWidth2 * index,
            index,
          })}
          initialNumToRender={itemCountPerRow()}
          data={data}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              name={item.name}
              poster={item.poster}
              ageGroup={item.ageGroup}
              yearOfCreation={item.yearOfCreation}
              isDubbed={item.isDubbed}
              isSubbed={item.isSubbed}
              videoType={item.videoType}
              completed={item.completed}
              isFavourited={item.isFavourited}
              VideoDetailsScreen={item.VideoDetailsScreen}
              navigation={navigation}
              width={itemWidth}
              videoFilesCount={item.videoFilesCount}
            />
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {Platform.OS === 'web' &&
          !Dimensions_().isIsmallScreenOrSmaller &&
          horizontal && (
            <>
              {!isfirstSlider && (
                <Arrows isLeft={false} goToSlide={goToSlide} />
              )}
              {!isLastSlider && <Arrows isLeft goToSlide={goToSlide} />}
            </>
          )}
      </View>
    </View>
  )
}

export default AnimeList

AnimeList.defaultProps = {
  horizontal: false,
}
