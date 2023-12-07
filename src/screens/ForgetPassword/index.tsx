import React, { useState, forwardRef } from 'react'
import { View, Image } from 'react-native'
import Text from '../../components/Text'
import Colors from '../../assets/colors'
import { Checkbox } from 'react-native-paper'
import Form from './Form'
import styles from './styles'
import { useMutation } from '@apollo/client'
import { signInGraphQL } from './graphql'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../User/ducks'
import Modal from '../../components/Modal'
import { isHasActiveSubscription as _isHasActiveSubscription } from '../../utils/helper'

interface ForgetPasswordProps {
  ref: any
  navigation: any
  switchSignInToSignUp: () => void
}
interface SetUserProps {
  payload: any
}

const ForgetPassword: React.FC<ForgetPasswordProps> = forwardRef(
  ({ switchSignInToSignUp, navigation }, ref) => {
    const [checked, setChecked] = useState(false)
    const [signIn] = useMutation(signInGraphQL)

    const dispatch = useDispatch()
    const isHasActiveSubscription = _isHasActiveSubscription()
    const setUser: React.FC<SetUserProps> = (payload) =>
      dispatch({
        type: SET_USER,
        payload: payload,
      })

    return (
      <Modal ref={ref}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/animeDownLogoColored.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} type='medium'>
            نسيت كلمة المرور؟
          </Text>
          <View style={styles.space} />
          <Text style={styles.subtitle} type='light'>
            أدخل عنوان البريد الإلكتروني المرتبط بحسابك وسنرسل لك تعليمات لإعادة
            تعيين كلمة المرور.
          </Text>
        </View>
        <Form
          onSubmit={(values, actions) => {
            signIn({
              variables: {
                email: values.email,
                pass: values.pass,
              },
            })
              .then((response) => {
                setUser(response.data.signIn)
                ref.current.hide()
                // isHasActiveSubscription() ? console.log('4444444') : console.log('----------');
                isHasActiveSubscription ? null : navigation.navigate('Payments')
                // Cookies.set('token', response.data.login.token);
                // // localStorage.setItem('token', response.data.login.token);
                // props.setUser({
                //   access_token: response.data.login.token,
                //   ...response.data.login.user,
                // });
                actions.setSubmitting(false)
              })
              .catch((error) => {
                console.log('error', error)
                // actions.setErrors(handleJsonErrors(error));
                error &&
                error.message &&
                error.message.includes('No user found for email')
                  ? actions.setErrors({
                      email: 'البريد الإلكتروني المدخل غير مسجل',
                    })
                  : error &&
                    error.message &&
                    error.message.includes('Invalid password')
                  ? actions.setErrors({ pass: 'كلمة المرور غير صحيحة' })
                  : null
                actions.setSubmitting(false)
              })
          }}
        />
      </Modal>
    )
  }
)

export default ForgetPassword
