import React, { forwardRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { View } from 'react-native'
import Colors from '../../assets/colors'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Text from '../../components/Text'
import { HelperText } from 'react-native-paper'
import styles from './styles'

interface FormProps {
  amount: number
  bankAccountNumber: string
  bankAccountName: string
}

const Dialog: React.FC<FormProps> = forwardRef(({ onSubmit }, ref) => {
  const defaultFields = {
    amount: 0,
    bankAccountNumber: '',
    bankAccountName: '',
  }

  const schema = Yup.object().shape({
    amount: Yup.number().required('يرجى إدخال المبلغ المحول'),
    bankAccountNumber: Yup.string().required(
      'يرجى إدخال رقم الحساب البنكي المحول منه'
    ),
    bankAccountName: Yup.string().required(
      'يرجى إدخال اسم صاحب الحساب البنكي المحول منه'
    ),
  })

  const formik = useFormik({
    initialValues: defaultFields,
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
  // const isFormValid = schema.isValidSync(values)
  return (
    <Modal ref={ref} style={{ width: 400 }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginVertical: 30, alignItems: 'center' }}>
          <Text type='bold' style={{ color: Colors.primary, fontSize: 20 }}>
            معلومات الحوالة البنكية
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            onChangeText={(e) => {
              handleChange('amount')
              setFieldValue('amount', parseInt(e))
            }}
            value={values.amount}
            onBlur={() => {
              setFieldTouched('amount', true)
            }}
            label='المبلغ المحول'
            keyboardType='decimal-pad'
          />
          <HelperText
            type='error'
            visible={errors.amount && touched.amount ? true : false}
          >
            {errors.amount}
          </HelperText>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            onChangeText={(e) => {
              handleChange('bankAccountNumber')
              setFieldValue('bankAccountNumber', e)
            }}
            value={values.bankAccountNumber}
            onBlur={() => {
              setFieldTouched('bankAccountNumber', true)
            }}
            label='رقم الحساب البنكي المحول منه'
            keyboardType='number-pad'
          />
          <HelperText
            type='error'
            visible={
              errors.bankAccountNumber && touched.bankAccountNumber
                ? true
                : false
            }
          >
            {errors.bankAccountNumber}
          </HelperText>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            label='اسم صاحب الحساب البنكي المحول منه'
            onChangeText={handleChange('bankAccountName')}
            value={values.bankAccountName}
            onBlur={() => setFieldTouched('bankAccountName', true)}
            textContentType='name'
          />
          <HelperText
            type='error'
            visible={
              errors.bankAccountName && touched.bankAccountName ? true : false
            }
          >
            {errors.bankAccountName}
          </HelperText>
        </View>
        <Button
          text='تأكيد معلومات التحويل'
          onPress={handleSubmit}
          icon='chevron-left'
          iconSize={28}
          loading={isSubmitting}
          // style={styles.signInBtn}
          textHoverColor={Colors.textOnPrimary}
        />
      </View>
    </Modal>
  )
})

export default Dialog
