import React from 'react'
import { View } from 'react-native'
import Text from '../../components/Text'
import Form from './Form'
import { useSelector } from 'react-redux'
// import { useQuery } from "@apollo/client";
import styles from './styles'
import ScreenWrapper from '../ScreenWrapper'
// import { QueryAllVideosCategories } from "./graphql";

const AccountScreen = ({ navigation }) => {
  const { email } = useSelector((state) => ({
    email: state.user.email,
  }))

  // const { loading, error, data } = useQuery(QueryAllVideosCategories, {
  //   variables: { profileId },
  // });

  // if (!loading && !error) {

  // if (error) {
  //   console.log("Error! home screen", error);
  // }
  // <View style={styles.container}>
  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        <Text type='bold' style={styles.title}>
          حسابي
        </Text>
        <View
          style={{
            width: '100%',
            height: 260,
            marginTop: 40,
          }}
        >
          <Form
            onSubmit={(values, actions) => {
              console.log('values', values)
              // signIn({
              //   variables: {
              //     email: values.email,
              //     password: values.password,
              //   },
              // })
              //   .then((response) => {
              //     ref.current.hide();

              //     setUser(response.data.signIn);
              //     response.data.signIn.status
              //       ? null
              //       : navigation.navigate('Subscribe');
              //     actions.setSubmitting(false);
              //   })
              //   .catch((error) => {
              //     console.log('error', error);
              //     error &&
              //     error.message &&
              //     error.message.includes('No user found for email')
              //       ? actions.setErrors({
              //           email: 'البريد الإلكتروني المدخل غير مسجل',
              //         })
              //       : error &&
              //         error.message &&
              //         error.message.includes('Invalid password')
              //       ? actions.setErrors({ password: 'كلمة المرور غير صحيحة' })
              //       : null;
              //     actions.setSubmitting(false);
              //   });
            }}
            email={email}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
  {
    // </View>
  }
}
export default AccountScreen
