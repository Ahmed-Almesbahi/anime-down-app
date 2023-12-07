import React, { useEffect, useRef, useState } from 'react'
import { View, Image } from 'react-native'
import Text from '../../components/Text'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import ScreenWrapper from '../ScreenWrapper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useHover } from '@huse/hover'
import Colors from '../../assets/colors'
import { TouchableRipple } from 'react-native-paper'
import { images, createProfile, deleteProfile, updateProfile } from './graphql'
import { useMutation, useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { HelperText } from 'react-native-paper'
import { updateProfiles } from '../User/ducks'
import { useIsFocused } from '@react-navigation/native'
import Dialog from './Dialog'

let RANDOM_IMAGE_ID = '00'

const ProfileScreen = ({ navigation, route }) => {
  const [state, setState] = useState(null)
  const isFocused = useIsFocused()
  useEffect(() => {
    RANDOM_IMAGE_ID = '00'
  }, [isFocused])
  const photosRef = useRef(null)
  const { profileId } = route.params
  const dispatch = useDispatch()
  let { profiles } = useSelector((state) => ({
    profiles: state.user.profiles,
  }))
  // const [isHover, hoverCallbacks] = useHover(undefined)
  const { userId } = useSelector((state) => ({
    userId: state.user.id,
  }))
  const isCreate = profileId === 'create'
  const imagesGraphQL = useQuery(images, {
    variables: {
      profileId1: profiles && profiles[0] ? profiles[0].id : 0,
      profileId2: profiles && profiles[1] ? profiles[1].id : 0,
      profileId3: profiles && profiles[2] ? profiles[2].id : 0,
    },
  })
  const [createProfileGraphQL] = useMutation(createProfile)
  const [deleteProfileGraphQL] = useMutation(deleteProfile)
  const [updateProfileGraphQL] = useMutation(updateProfile)

  const currentProfileIndex = () => {
    for (var k in profiles) {
      if (profiles.hasOwnProperty(k)) {
        if (profiles[k].id === parseInt(profileId)) return k
      }
    }
  }

  const onSubmit = (values, actions) => {
    isCreate
      ? createProfileGraphQL({
          variables: {
            name: values.name,
            image: imagesGraphQL.data.images[RANDOM_IMAGE_ID].id,
            user: userId,
          },
        })
          .then((response) => {
            dispatch(
              updateProfiles([...profiles, response.data.createOneProfile])
            )
            actions.setSubmitting(false)
            navigation.navigate('Profiles')
          })
          .catch((error) => {
            console.log('error', error)
          })
      : updateProfileGraphQL({
          variables: {
            name: values.name,
            image:
              state !== null
                ? imagesGraphQL && imagesGraphQL.data.images[state].id
                : profiles[currentProfileIndex()].Image.id,
            profileId: parseInt(profileId),
          },
        })
          .then((response) => {
            let _profiles = [...profiles]
            _profiles[currentProfileIndex()] = response.data.updateOneProfile
            dispatch(updateProfiles(_profiles))
            actions.setSubmitting(false)
            navigation.navigate('Profiles')
          })
          .catch((error) => {
            console.log('error', error)
          })
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('يرجى إدخال اسم'),
  })
  const formik = useFormik({
    initialValues: {
      name: isCreate ? '' : profiles[currentProfileIndex()].name,
    },
    validationSchema: schema,
    onSubmit: onSubmit,
  })
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = formik
  if (imagesGraphQL && imagesGraphQL.error) {
    console.log('Error! home screen', imagesGraphQL.error)
  }

  const random = () => {
    if (RANDOM_IMAGE_ID === '00') {
      RANDOM_IMAGE_ID = Math.floor(
        Math.random() * imagesGraphQL.data.images.length
      )
    }
    return RANDOM_IMAGE_ID
  }

  return (
    <ScreenWrapper>
      {imagesGraphQL && !imagesGraphQL.loading && !imagesGraphQL.error ? (
        <View style={styles.container}>
          <Dialog
            ref={photosRef}
            data={imagesGraphQL.data}
            onPress={(imageId) => {
              setState(imageId)
            }}
          />
          <Text type='medium' style={styles.title}>
            {isCreate ? 'إضافة ملف شخصي' : 'تعديل الملف الشخصي'}
          </Text>
          <View style={styles.profilesContent}>
            <View style={{ flex: 3 }}>
              <TouchableRipple
                onPress={() => photosRef.current.show()}
                style={styles.imageContainer}
              >
                <>
                  <View style={styles.overlay}>
                    <MaterialCommunityIcons
                      name={'pencil'}
                      size={30}
                      color={Colors.surface}
                      style={styles.pencilIcon}
                    />
                  </View>
                  <Image
                    source={
                      isCreate
                        ? state !== null
                          ? imagesGraphQL &&
                            imagesGraphQL.data.images[state].url
                          : imagesGraphQL &&
                            imagesGraphQL.data.images[random()].url
                        : state !== null
                        ? imagesGraphQL && imagesGraphQL.data.images[state].url
                        : profiles[currentProfileIndex()].Image.url
                    }
                    // alt='itemPicture'
                    style={styles.image}
                  />
                </>
              </TouchableRipple>
            </View>
            <View style={{ flex: 5 }}>
              <TextInput
                onChangeText={(a) => {
                  handleChange('name')
                  setFieldValue('name', a)
                }}
                value={values.name}
                onBlur={() => {
                  setFieldTouched('name', true)
                }}
                label='الاسم'
                textContentType='name'
              />
              <HelperText
                type='error'
                visible={errors.name && touched.name ? true : false}
              >
                {errors.name}
              </HelperText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Button
              text={isCreate ? 'إضافة الملف الشخصي' : 'حفظ'}
              onPress={handleSubmit}
              style={{
                width: 180,
                marginHorizontal: 8,
              }}
              iconSize={33}
              glowColor={Colors.primary}
              glow
              hoverColor={Colors.tertiary}
              loading={isSubmitting}
            />
            <Button
              text='إلغاء'
              onPress={() => navigation.navigate('Profiles')}
              style={{
                width: 100,
                marginHorizontal: 8,
              }}
              iconSize={33}
              color={Colors.surface}
              glowColor={Colors.shadowOnSurface}
              glow
              dark
              hoverColor={Colors.secondary}
              textColor={Colors.textOnSurface}
            />
            {isCreate || (profiles && profiles.length < 2) ? null : (
              <Button
                text='حذف الملف الشخصي'
                onPress={() => {
                  deleteProfileGraphQL({
                    variables: {
                      profileId: profileId,
                    },
                  })
                    .then((response) => {
                      let _profiles = [...profiles]
                      _profiles.splice(parseInt(currentProfileIndex()), 1)
                      actions.setSubmitting(false)
                      navigation.navigate('Profiles')
                      dispatch(updateProfiles(_profiles))
                    })
                    .catch((error) => {
                      console.log('error', error)
                    })
                }}
                style={{
                  width: 180,
                  marginHorizontal: 8,
                }}
                iconSize={33}
                color={Colors.surface}
                glowColor={Colors.shadowOnSurface}
                glow
                hoverColor={Colors.secondary}
                textColor={Colors.textOnSurface}
                loading={isSubmitting}
              />
            )}
          </View>
        </View>
      ) : null}
    </ScreenWrapper>
  )
}
export default ProfileScreen
