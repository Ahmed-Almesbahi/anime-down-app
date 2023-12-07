import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Text from '../../components/Text'
import styles from './styles'
import Colors from '../../assets/colors'
import ScreenWrapper from '../ScreenWrapper'
import Button from '../../components/Button'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { paypalVerifyPaymentGraphQL } from './graphql'

const ThankYouScreen = ({ navigation, route }) => {
  const [state, setState] = useState(5)

  const { selectedProfile } = useSelector((state) => ({
    selectedProfile: state.user.selectedProfile.name,
  }))
  const isSelectedProfile = selectedProfile === undefined
  const payerId = route?.params?.PayerID
  const transferReferenceNumber = route?.params?.paymentId
  const [paypalVerifyPayment] = useMutation(paypalVerifyPaymentGraphQL)

  useEffect(() => {
    setTimeout(() => {
      setState(state - 1)
    }, 1000)
  }, [state])
  useEffect(() => {
    paypalVerifyPayment({
      variables: {
        payerId,
        transferReferenceNumber,
      },
    })
      .then((response) => {
        console.log(
          'response',
          response?.data?.paypalVerifyPayment?.status === 1,
          response?.data?.paypalVerifyPayment?.token
        )
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [])

  if (state === 0) {
    isSelectedProfile
      ? navigation.navigate('Profiles')
      : navigation.navigate('Home')
  }

  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        <Text
          style={{
            color: Colors.textOnPrimary,
            fontSize: 45,
            textAlign: 'center',
          }}
        >
          شكرا لاشتراكك مع{'\n'}AnimeDown
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: Colors.textOnPrimary,
              fontSize: 30,
            }}
          >
            سيتم تحويلك تلقائيا بعد
          </Text>
          <Text
            style={{
              color: Colors.textOnPrimary,
              fontSize: 50,
            }}
          >
            {state}
          </Text>
          <Text
            style={{
              color: Colors.textOnPrimary,
              fontSize: 30,
            }}
          >
            ثوان
          </Text>
        </View>
        <Button
          text={
            isSelectedProfile
              ? 'الانتقال إلى صفحة الملفات الشخصية'
              : 'الانتقال إلى الصفحة الرئيسية'
          }
          onPress={() => {
            isSelectedProfile
              ? navigation.navigate('Profiles')
              : navigation.navigate('Home')
          }}
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
      {/* <View style={styles.contentContainer}>
        <View style={styles.tabsContainer}>
          <TouchableRipple
            style={[styles.tab, styles.firstTab]}
            onPress={() => setState('paymentMethods')}
          >
            <Text
              type='medium'
              style={{
                color:
                  state === 'paymentMethods'
                    ? Colors.textOnSurface
                    : Colors.textOnSurfaceLight,
              }}
            >
              طرق الدفع
            </Text>
          </TouchableRipple>
          <TouchableRipple
            style={[styles.tab, styles.lastTab]}
            onPress={() => setState('paymentHistory')}
          >
            <Text
              type='medium'
              style={{
                color:
                  state === 'paymentHistory'
                    ? Colors.textOnSurface
                    : Colors.textOnSurfaceLight,
              }}
            >
              سجل المدفوعات
            </Text>
          </TouchableRipple>
        </View>
      </View> */}
    </ScreenWrapper>
  )
}
export default ThankYouScreen
