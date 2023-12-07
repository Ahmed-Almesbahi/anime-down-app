import React, { useState, forwardRef } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Colors from '../../assets/colors'
import { Checkbox } from 'react-native-paper'
import Form from './Form'
import styles from './styles'
import { useMutation } from '@apollo/client'
import { signInGraphQL } from './graphql'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../User/ducks'
import Modal from '../../components/Modal'

interface SignInProps {
  ref: any
  switchSignInToSignUp: () => void
  switchSignInToForgetPassword: () => void
  navigation: any
}

const SignIn: React.FC<SignInProps> = forwardRef(
  ({ switchSignInToSignUp, switchSignInToForgetPassword, navigation }, ref) => {
    // const [checked, setChecked] = useState(false)

    const dispatch = useDispatch()
    const setUser = (payload: any) => {
      dispatch({
        type: SET_USER,
        payload: payload,
      })
    }
    const [signIn] = useMutation(signInGraphQL)

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
            تسجيل الدخول لانيمي داون
          </Text>
          <View style={styles.space} />
          <Text style={styles.subtitle} type='light'>
            مرحبا بعودتك، شاهد ما الجديد
          </Text>
        </View>
        <Form
          onSubmit={(values, actions) => {
            signIn({
              variables: {
                email: values.email,
                password: values.password,
              },
            })
              .then((response) => {
                // dispatch({
                //   type: SET_USER,
                //   payload: response.data.signIn,
                // })
                ref.current.hide()

                setUser(response.data.signIn)
                response.data.signIn.status
                  ? navigation.navigate('Profiles')
                  : navigation.navigate('Payments')
                // ref.current.hide()
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
                  ? actions.setErrors({ password: 'كلمة المرور غير صحيحة' })
                  : null
                actions.setSubmitting(false)
              })
          }}
        />
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={{ alignItems: 'center', marginLeft: -10, flexDirection: 'row' }}>
                  <Checkbox.Android
                    // // // status={checked ? 'checked' : 'unchecked'}
                    // // onPress={() => setChecked(!checked)}
                    color={Colors.quinary}
                    // uncheckedColor={Colors.textOnSurface}
                  />
                  <Text style={{ color: Colors.textOnSurface }} >تذكرني</Text>
                </View> */}
        <View style={styles.forgetPassContainer}>
          <TouchableOpacity
            style={styles.forgetPass}
            onPress={() => switchSignInToForgetPassword()}
          >
            <Text style={styles.forgetPassText}>نسيت كلمة المرور ؟</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}

        <View style={styles.orContainer}>
          <View style={styles.orLine1} />
          <Text style={styles.orText}>أو</Text>
          <View style={styles.orLine2} />
        </View>
        {/* <Button
        text='تسجيل الدخول عبر Google'
        mode='outlined'
        color={Colors.septenary}
        style={{ marginVertical: 17 }}
      /> */}
        <Button
          text='ليس لديك حساب؟ سجل الآن'
          mode='outlined'
          color={Colors.septenary}
          onPress={() => {
            switchSignInToSignUp()
          }}
        />
      </Modal>
    )
  }
)

export default SignIn
