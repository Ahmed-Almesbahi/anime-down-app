import React, { useRef } from 'react'
import { View, Image } from 'react-native'
import Text from '../../components/Text'
import Surface from '../../components/Surface'
import styles from './styles'
// import { useHover } from '@huse/hover'
import Colors from '../../assets/colors'
import Dialog from './Dialog'
import axios from 'axios'
import { payPalGraphQL, bankGraphQL, paymentsHistoryGraphQL } from './graphql'
import { useMutation } from '@apollo/client'
import { WebView } from 'react-native-webview'
import FormData from 'form-data'
import { subscriptionExpireDateGraphQL } from './graphql'
import { useQuery } from '@apollo/client'
import { formatDate } from '../../utils/helper'

const PaymentBox = ({
  image,
  image2,
  info,
  info2,
  title,
  note,
  onPress,
}: any) => {
  // const [isHover, hoverCallbacks] = useHover(undefined)

  return (
    <Surface onPress={onPress}>
      <View
        style={{
          marginVertical: 15,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Text
          type='medium'
          style={{
            //   fontSize: 16,
            color: Colors.textOnSurface,
            textAlign: 'left',
          }}
        >
          {title}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 2,
          }}
        >
          <Image source={image} style={styles.image} />
          {image2 ? (
            <View>
              <Image source={image2} style={styles.image} />
            </View>
          ) : null}
        </View>
        <View
          style={{
            flex: 5,
          }}
        >
          <View
            style={{ flex: 1, marginVertical: 15, justifyContent: 'center' }}
          >
            <Text style={{ color: Colors.senary, textAlign: 'left' }}>
              {info}
            </Text>
          </View>
          {info2 ? (
            <View
              style={{ flex: 1, marginVertical: 15, justifyContent: 'center' }}
            >
              <Text style={{ color: Colors.senary, textAlign: 'left' }}>
                {info2}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View
        style={{
          marginVertical: 5,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: Colors.error,
          }}
        >
          {note}
        </Text>
      </View>
    </Surface>
  )
}

const PaymentMethods = ({ navigation }) => {
  const PaymentFormRef = useRef(null)
  const [paypal] = useMutation(payPalGraphQL)
  const [bank] = useMutation(bankGraphQL)
  const { loading, error, data } = useQuery(subscriptionExpireDateGraphQL)
  return (
    <View style={styles.tabScreen}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text type='bold' style={styles.title}>
          طرق الدفع
        </Text>
        {data?.me[0]?.accessExpireDate === null ||
        data?.me[0]?.accessExpireDate === undefined ? (
          <Text type='medium' style={styles.subscripe}>
            رسوم الاشتراك لـ 30 يوم 40 ريال
          </Text>
        ) : (
          <Text type='regular' style={styles.subTitile}>
            ينتهي اشتراكك الحالي في تاريخ{' '}
            {formatDate(data?.me[0]?.accessExpireDate)}
            {'\n'}مدد اشتراكك لـ 30 يوم إضافي بقيمة 40 ريال
          </Text>
        )}
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text type='bold' style={styles.label}>
          اختر طريقة الدفع
        </Text>

        <PaymentBox
          image={require('../../assets/images/paypal.png')}
          onPress={() => {
            window.open(`https://www.almesbahi.uk/b/`, '_self')
          }}
          // onPress={() => {
          //   paypal({
          //     variables: {
          //       productId: 8,
          //       currency: 'USD',
          //     },
          //   })
          //     .then((response) => {
          //       window.open(`${response?.data?.paypal?.paymentUrl}`, '_self')
          //     })
          //     .catch((error) => {
          //       console.log('error', error)
          //     })
          // }}
          title='الدفع عبر البطائق الإئتمانية من خلال PayPal'
          info='حساب الباي بال payments@animedown.tv'
          note='يتم تفعيل الحساب مباشرة بعد الدفع'
        />
        <PaymentBox
          onPress={() => PaymentFormRef.current.show()}
          image={require('../../assets/images/alrajhi.png')}
          image2={require('../../assets/images/NCB.png')}
          info={
            'اسم البنك: AL Rajhi Bank - السعودية\nرقم الحساب: 451608012004788\nSA4480000451608012004788 :IBAN\nاسم صاحب الحساب: أحمد عبدالوهاب حيدر'
          }
          info2={
            'اسم البنك: الأهلي (NCB) - السعودية\nرقم الحساب: 32900000023206\nSA0810000032900000023206 :IBAN\nاسم صاحب الحساب: أحمد عبدالوهاب حيدر\nالسويفت كود: NCBKSAJE'
          }
          title='الدفع عبر الحوالات البنكية'
          note='يستغرق تفعيل الحساب من 1-6 ساعات بعد إرسال معلومات الدفع'
        />
      </View>
      <Dialog
        ref={PaymentFormRef}
        onSubmit={(values: any, actions: any) => {
          bank({
            variables: {
              amount: values.amount,
              bankAccountNumber: values.bankAccountNumber,
              bankAccountName: values.bankAccountName,
            },
            refetchQueries: [{ query: paymentsHistoryGraphQL }],
          })
            .then((response) => {
              actions.setSubmitting(false)
              PaymentFormRef.current.hide()
            })
            .catch((error) => {
              actions.setSubmitting(false)
              console.log('error', error)
            })
        }}
      />
    </View>
  )
}
export default PaymentMethods
