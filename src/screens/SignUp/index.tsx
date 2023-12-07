import React, { useState, forwardRef } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Colors from '../../assets/colors'
import { Checkbox } from 'react-native-paper'
import Form from './form'
import styles from './styles'
import { useMutation } from '@apollo/client'
import { signUpGraphQL } from './graphql'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../User/ducks'
import Modal from '../../components/Modal'

interface SignUpProps {
  ref: any
  switchSignUpToSignIn: () => void
  navigation: any
}

const SignUp: React.FC<SignUpProps> = forwardRef(
  ({ switchSignUpToSignIn, navigation }, ref) => {
    const [signUp] = useMutation(signUpGraphQL)

    const dispatch = useDispatch()
    const setUser = (payload: any) =>
      dispatch({
        type: SET_USER,
        payload: payload,
      })

    return (
      <Modal ref={ref}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/animeDownLogoColored.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title} type='medium'>
              إنشاء حساب مع انيمي داون
            </Text>
            <View style={styles.space} />
            <Text style={styles.subtitle} type='light'>
              الخطوة 1 من 2
            </Text>
          </View>
        </View>
        <View style={styles.largeSpace} />
        <Form
          onSubmit={(values, actions) => {
            signUp({
              variables: {
                password: values.password,
                email: values.email,
              },
            })
              .then((response) => {
                setUser(response.data.createOneUser)
                // ref.current.hide()
                navigation.navigate('Payments')
                // Cookies.set('token', response.data.login.token);
                // // localStorage.setItem('token', response.data.login.token);
                // props.setUser({
                //   access_token: response.data.login.token,
                //   ...response.data.login.user,
                // });
                actions.setSubmitting(false)
              })
              .catch((error) => {
                error &&
                error.message &&
                error.message.includes(
                  'Unique constraint failed on the constraint: `login`'
                )
                  ? actions.setErrors({
                      email: 'يوجد حساب مسبقاً لهذا البريد الإلكتروني',
                    })
                  : // لديك حساب مسبق، إذا كنت نست كلمة المرور
                    console.log('error---')
                actions.setSubmitting(false)
              })
          }}
        />
        <View style={styles.respectPrivacy}>
          <Text style={styles.privacyText} type='light'>
            انيمي داون يحترم خصوصيتك. اقرأ عن
          </Text>
          <Text
            navigate={'test'}
            // navigate={navigation.navigate('privacyPolicy')}
            type='light'
          >
            سياستنا للخصوصية
          </Text>
        </View>
        <Button
          text='لديك حساب؟ سجل الدخول'
          mode='outlined'
          color={Colors.septenary}
          onPress={() => {
            switchSignUpToSignIn()
          }}
        />
      </Modal>
    )
  }
)

export default SignUp
