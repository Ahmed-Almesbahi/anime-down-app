import React, { useRef } from 'react'
import { View, ScrollView } from 'react-native'
import Button from '../../components/Button'
import styles from './styles'
import Colors from '../../assets/colors'
import axios from 'axios'
import FormData from 'form-data'
import ScreenWrapper from '../ScreenWrapper'
import ForgetPassword from '../ForgetPassword'
import SignUp from '../SignUp'
import SignIn from '../SignIn'

const LauncherScreen = ({ navigation }) => {
  const signIn = useRef(null)
  const signUp = useRef(null)
  const forgetPassword = useRef(null)

  const switchSignInToSignUp = () => {
    signIn.current.hide()
    setTimeout(() => signUp.current.show(), 150)
  }
  const switchSignUpToSignIn = () => {
    signUp.current.hide()
    setTimeout(() => signIn.current.show(), 150)
    // signUp.current.show()
  }
  const switchSignInToForgetPassword = () => {
    signIn.current.hide()
    setTimeout(() => forgetPassword.current.show(), 150)
  }
  const createUser = async () => {
    const formData = new FormData()
    formData.append('pass', 'ahmed')
    formData.append('email', 'ahmexd23@ahmed.com')
    // formData.append('name_f', 'ahmed')
    formData.append('_key', 'KgYrQEcIKXy4FaQIxe1U')
    // console.log('formData---', formData)
    // const aa = await axios({
    //   method: 'post',
    //   url: 'http://m.animedown.tv/api/users',
    //   data: formData,
    // })
    const aa = await axios.post('http://m.animedown.tv/api/users', formData)
    console.log('aa', aa)
  }

  return (
    <ScreenWrapper>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <SignIn
          ref={signIn}
          switchSignInToSignUp={switchSignInToSignUp}
          switchSignInToForgetPassword={switchSignInToForgetPassword}
          navigation={navigation}
        />
        <SignUp
          ref={signUp}
          switchSignUpToSignIn={switchSignUpToSignIn}
          navigation={navigation}
        />
        <ForgetPassword ref={forgetPassword} navigation={navigation} />
        <Button
          text='تسجيل الدخول'
          onPress={() => signIn.current.show()}
          mode='outlined'
          hoverGlow={Colors.surface}
          style={{ marginBottom: 20 }}
          dark
          icon='file'
        />
        {/* <Button
          text='تسجيل'
          onPress={() => createUser()}
          glow
          dark
          icon='file'
        /> */}
      </View>
    </ScreenWrapper>
  )
}
export default LauncherScreen
