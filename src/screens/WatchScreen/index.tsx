import React, { useRef, useState } from 'react'
import { View, Modal, Pressable } from 'react-native'
import styles from './styles'
import { useQuery } from '@apollo/client'
import { QueryWatchVideo } from './graphql'
import ReactPlayer from 'react-player/file'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Controls from './controls'
import { ActivityIndicator } from 'react-native-paper'
import Colors from '../../assets/colors'
import axios from 'axios'

const WatchScreen = ({ route, navigation }) => {
 
  const updateVideoFileMutation = (id, aws_url, isReady, convertingStatus, duration, fileName) => {
    // updateVideoFileMutation(id, aws_url, isReady, convertingStatus, duration, fileNameWithFormat)
    console.log('started------------')
    try {
      const response = axios.post(
        'http://localhost:4000/',
        {
          mutation: `mutation _UpdateOneVideoFile($data: VideoFileUpdateInput!, $where: VideoFileWhereUniqueInput!) {
            _UpdateOneVideoFile(data: $data, where: $where) {
          id
          fileName
          url
          aws_url
        }
      }`,
          variables: {
            where: {id},
            data: {aws_url: {set: aws_url}, isReady: {set: isReady}, convertingStatus: {set: convertingStatus}, duration: {set: duration}, fileName: {set: fileName}}
          },
        },
        {
          headers: {
            Authorization:
              `Bearer ${process?.env?.API_TOKEN}`,
          },
        }
      )
      return response
    } catch (error) {
      console.log('error', error)
      // throw new Error('Connection Error at Check Video Files In Queue')
    }
  }

  const { videoFileId } = route.params
  const [state, setState] = useState({
    playing: true,
    duration: 0,
    currentTime: 0,
    volume: 1,
    muted: false,
    isDisplayingControls: true,
    loading: true,
  })

  const player = useRef(null)

  const { loading, error, data } = useQuery(QueryWatchVideo, {
    variables: { videoFileId: parseInt(videoFileId) },
    fetchPolicy: 'cache-first',
  })

  const handleFullScreen = useFullScreenHandle()

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing })
    player.current.pause
  }
  const handleSeek = (newValue: number) => {
    setState({
      ...state,
      currentTime: newValue,
    })
    player.current.seekTo(newValue)
  }
  const handleMuted = () => setState({ ...state, muted: !state.muted })
  const handleVolume = (newValue) => setState({ ...state, volume: newValue })

  if (error) {
    console.log('error', error)
  }
  if (loading) {
    return (
      <View>
        <Modal visible transparent={true}>
          <View
            style={{ height: '100%', width: '100%', backgroundColor: 'black' }}
          />
        </Modal>
      </View>
    )
  }
  const config = {
    file: {
      attributes: {
        crossOrigin: 'anonymous',
        onContextMenu: (e) => e.preventDefault(),
      },
      tracks: [
        {
          kind: 'subtitles',
          src: 'http://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt',
          srcLang: 'en',
          default: true,
          mode: 'showing',
          label: 'English',
        },
      ],
    },
  }

  
  return (
    <Modal>
      <FullScreen handle={handleFullScreen}>
      {/* {updateVideoFileMutation(17379, 'testURL', 1, 0, 20.2, 'fileName')} */}
        <Pressable
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            height: '100%',
          }}
          onPress={() => handlePlayPause()}
        >
          <ReactPlayer
            playsinline
            ref={player}
            volume={state.volume}
            muted={state.muted}
            onBuffer={() => setState({ ...state, loading: true })}
            onBufferEnd={() => setState({ ...state, loading: false })}
            onProgress={(a) => {
              setState({ ...state, currentTime: a.playedSeconds })
            }}
            onDuration={(duration) =>
              setState({ ...state, duration: duration })
            }
            playing={state.playing}
            height='100%'
            width='100%'
            url={
              // 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8'
              // 'https://s3.eu-central-1.amazonaws.com/images.animedown.tv/stream_0/stream_0.m3u8'
              // 'https://s3.eu-central-1.amazonaws.com/images.animedown.tv/master.m3u8'
              'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8'
            }
            // url={data?.videoFile?.aws_url}
            config={config}
          />
          <Controls
            handleSeek={handleSeek}
            handleFullScreen={handleFullScreen}
            handlePlayPause={handlePlayPause}
            handleMuted={handleMuted}
            handleVolume={handleVolume}
            navigation={navigation}
            duration={state.duration}
            currentTime={state.currentTime}
            playing={state.playing}
            volume={state.volume}
            muted={state.muted}
          />
          {state.loading ? (
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, .5)',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }}
            >
              <ActivityIndicator
                animating={true}
                color={Colors.surface}
                size={80}
              />
            </View>
          ) : null}
        </Pressable>
      </FullScreen>
    </Modal>
  )
}

export default WatchScreen
