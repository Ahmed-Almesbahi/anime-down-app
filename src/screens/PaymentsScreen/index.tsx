import React, { useState } from 'react'
import { View } from 'react-native'
import Text from '../../components/Text'
import styles from './styles'
import Colors from '../../assets/colors'
import PaymentMethods from './PaymentMethods'
import PaymentHistory from './PaymentHistory'
import { TouchableRipple } from 'react-native-paper'
import ScreenWrapper from '../ScreenWrapper'

const PaymentsScreen = ({ navigation }) => {
  const [state, setState] = useState('paymentMethods')

  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        {state === 'paymentMethods' ? <PaymentMethods /> : <PaymentHistory />}
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
      </View>
    </ScreenWrapper>
  )
}
export default PaymentsScreen
