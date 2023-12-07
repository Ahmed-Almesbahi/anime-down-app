import React, { useRef, useState } from 'react'
import { View, Image, Animated, Platform, StyleSheet } from 'react-native'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'
import ScreenWrapper from '../ScreenWrapper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useHover } from '@huse/hover'
import Colors from '../../assets/colors'
import { TouchableRipple } from 'react-native-paper'
import { updateSelectedProfile } from '../User/ducks'
import { updateSelectedProfileGraphQL } from './graphql'
import { useMutation } from '@apollo/client'

const Loop = ({ data, editable, navigation, dispatchSelectedProfile }) => {
  const [isHover, hoverCallbacks] = useHover(undefined)
  const [updateProf] = useMutation(updateSelectedProfileGraphQL)
  // const navigateTo = 'Profile'
  // const navigateTo = 'Profile', { profileId: data.id }
  // const navigateTo = editable ? 'Profile', { profileId: data.id } : 'Home'
  return (
    <View {...hoverCallbacks} key={data?.id}>
      <View
        style={[
          styles.profile,
          Platform.OS === 'web'
            ? isHover
              ? {
                  transform: [{ scale: 1.3 }],
                  transitionDuration: '200ms',
                }
              : { transitionDuration: '200ms' }
            : null,
        ]}
      >
        <TouchableRipple
          // onPress={() => console.log('onPress', editable)}
          onPress={() =>
            editable
              ? navigation.navigate('Profile', { profileId: data.id })
              : updateProf({
                  variables: {
                    profileId: data.id,
                  },
                })
                  .then((response) => {
                    navigation.navigate('Home'),
                      dispatchSelectedProfile(
                        response.data.updateSelectedProfile
                      )
                  })
                  .catch((error) => {
                    console.log('error', error)
                  })
          }
          style={[
            styles.imageContainer,
            Platform.OS === 'web'
              ? isHover
                ? {
                    shadowColor: Colors.shadowOnPrimary,
                    borderRadius: 100,
                    shadowOpacity: 0.36,
                    shadowRadius: 20,
                    transitionDuration: '200ms',
                  }
                : { transitionDuration: '200ms' }
              : null,
          ]}
        >
          <>
            {editable ? (
              <View style={styles.overlay}>
                <MaterialCommunityIcons
                  name={'pencil'}
                  size={30}
                  color={Colors.surface}
                  style={styles.pencilIcon}
                />
              </View>
            ) : null}
            <Image
              source={{ uri: data?.Image?.url }}
              // alt='itemPicture'
              style={styles.image}
            />
          </>
        </TouchableRipple>
        <Text type='medium'>{data.name}</Text>
      </View>
    </View>
  )
}

const ProfilesScreen = ({ navigation }) => {
  const [state, setState] = useState({ editable: false })
  const { profiles } = useSelector((state) => ({
    profiles: state.user.profiles,
  }))
  const dispatch = useDispatch()
  const dispatchSelectedProfile = (selectedProfile) => {
    dispatch(updateSelectedProfile(selectedProfile))
  }

  const loopProfiles = () => {
    let _data = []
    if (profiles && profiles.length > 0) {
      profiles.map((a) => {
        _data.push(
          <Loop
            key={a.id}
            data={a}
            navigation={navigation}
            editable={state.editable}
            dispatchSelectedProfile={dispatchSelectedProfile}
          />
        )
      })
    }
    const [isHover, hoverCallbacks] = useHover(undefined)
    if (profiles && profiles.length < 4) {
      _data.push(
        <View key='addProfile' {...hoverCallbacks}>
          <View
            style={[
              styles.profile,
              Platform.OS === 'web'
                ? isHover
                  ? {
                      transform: [{ scale: 1.3 }],
                      transitionDuration: '200ms',
                    }
                  : { transitionDuration: '200ms' }
                : null,
            ]}
          >
            <TouchableRipple
              onPress={() =>
                navigation.navigate('Profile', { profileId: 'create' })
              }
              style={[
                styles.addProfile,
                Platform.OS === 'web'
                  ? isHover
                    ? {
                        shadowColor: Colors.shadowOnPrimary,
                        borderRadius: 10000,
                        shadowOpacity: 0.26,
                        shadowRadius: 20,
                        transitionDuration: '200ms',
                      }
                    : { transitionDuration: '200ms' }
                  : null,
              ]}
            >
              <MaterialCommunityIcons
                name={'plus'}
                size={90}
                color={Colors.surface}
              />
            </TouchableRipple>
            <Text type='medium'>إضافة ملف شخصي</Text>
          </View>
        </View>
      )
    }
    return _data
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>من يشاهد الآن؟</Text>
        <View style={styles.profilesContent}>{loopProfiles()}</View>
        <Button
          text={state.editable ? 'تم' : 'إدارة الملفات الشخصية'}
          onPress={() => setState({ editable: state.editable ? false : true })}
          style={{
            width: '100%',
            maxWidth: 400,
          }}
          hoverGlow={Colors.secondary}
          iconSize={33}
          dark
          hoverColor={Colors.secondary}
          textColor={Colors.textOnSurface}
          size='large'
        />
      </View>
    </ScreenWrapper>
  )
}
export default ProfilesScreen
