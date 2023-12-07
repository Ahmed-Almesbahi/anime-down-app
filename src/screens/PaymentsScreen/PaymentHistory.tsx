import React from 'react'
import { View } from 'react-native'
import Colors from '../../assets/colors'
import Text from '../../components/Text'
import Surface from '../../components/Surface'
import { formatDate } from '../../utils/helper'
import styles from './styles'
import { paymentsHistoryGraphQL } from './graphql'
import { useQuery } from '@apollo/client'

const PaymentHistory = ({ navigation }) => {
  const { loading, error, data } = useQuery(paymentsHistoryGraphQL)

  const loopData = (data: any) => {
    let _data = []
    data?.paymentsHistory.map((a) => {
      _data.push(
        <View
          key={a.id}
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Surface>
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
              }}
            >
              <View style={styles.paymentHistoryTextContainer}>
                <Text style={styles.paymentHistoryDescriptionText}>
                  التاريخ
                </Text>
                <Text style={styles.paymentHistoryText}>
                  {formatDate(a.createdAt)}
                </Text>
              </View>
              <View style={styles.paymentHistoryTextContainer}>
                <Text style={styles.paymentHistoryDescriptionText}>المبلغ</Text>
                <Text style={styles.paymentHistoryText}>
                  {a.currency} {a.amount}
                </Text>
              </View>
              <View style={styles.paymentHistoryTextContainer}>
                <Text style={styles.paymentHistoryDescriptionText}>الحالة</Text>
                {a.status === 1 ? (
                  <Text style={styles.paymentHistoryText}>مدفوع</Text>
                ) : a.status === 2 ? (
                  <Text style={styles.paymentHistoryText}>مرفوض</Text>
                ) : (
                  <Text style={styles.paymentHistoryText}>
                    بانتظار المراجعة
                  </Text>
                )}
              </View>
            </View>
          </Surface>
        </View>
      )
    })
    return _data
  }

  return (
    <View style={styles.tabScreen}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text type='bold' style={styles.title}>
          سجل المدفوعات
        </Text>
      </View>
      {!loading ||
      (!error && data?.paymentsHistory && data.paymentsHistory.length > 0) ? (
        loopData(data)
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 270,
          }}
        >
          <Text style={{ color: Colors.textOnSurface, fontSize: 22 }}>
            لم تقم بأي عملية دفع حتى الآن
          </Text>
        </View>
      )}
    </View>
  )
}
export default PaymentHistory
