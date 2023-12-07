import * as React from 'react'
import { View, Button } from 'react-native'
// import { Video, AVPlaybackStatus } from 'expo-av'
import styles from './styles'
import { useQuery, useMutation } from '@apollo/client'
import { QueryWatchVideo } from './graphql'
import Video, { TextTrackType } from 'react-native-video'

const WatchScreen = ({ route }) => {
  const { videoFileId } = route.params

  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  const { loading, error, data } = useQuery(QueryWatchVideo, {
    variables: { videoFileId: parseInt(videoFileId) },
    fetchPolicy: 'cache-first',
  })

  if (error) {
    console.log('error', error)
  }
  if (loading) {
    return null
  }
  return (
    <View style={styles.container}>
      {!loading && !error ? console.log(data.videoFile.aws_url) : null}
      {/* <Video
        source={{
          uri: 'https://watch.animedown.tv/Video/1950/Muhammad_The_Last_Prophet.m3u8',
          headers: { [string]: string },
          // uri: data?.videoFile?.aws_url,
        }}
        shouldPlay
        useNativeControls={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      /> */}
      <Video
        source={{
          // uri: 'https://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=m3u8-aapl)',
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          // uri: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
          // type: 'm3u8',
        }} // Can be a URL or a local file.
        //  ref={(ref) => {
        //    this.player = ref
        //  }}                                      // Store reference
        //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
        //  onError={this.videoError}               // Callback when video cannot be loaded
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        paused={false}
        resizeMode='contain'
        controls
        textTracks={[
          {
            title: 'English CC',
            language: 'en',
            type: TextTrackType.VTT, // "text/vtt"
            uri: 'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
          },
        ]}
        selectedTextTrack={{
          type: 'title',
          value: 'English CC',
        }}
      />
      {/* <Video
        ref={video}
        // style={styles.video}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        source={{
          // uri:
          //   'https://watch.animedown.tv/Video/1950/Muhammad_The_Last_Prophet.m3u8',
          // headers: { overrideFileExtensionAndroid: 'm3u8' },
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          // uri: data?.videoFile?.aws_url,
        }}
        useNativeControls
        resizeMode='contain'
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      /> */}

      {/* <video controls data-setup='{}'>
        <source
          src='https://watch.animedown.tv/Video/1913/Rascal_30.m3u8'
          // src='https://s3.eu-central-1.amazonaws.com/images.animedown.tv/yt1s.com+-+Oden+vs+Whitebeard++One+Piece_720p.mp4'
          type='video/m3u8'
        ></source>
      </video> */}
    </View>
  )
}

export default WatchScreen
