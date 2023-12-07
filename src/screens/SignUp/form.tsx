import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { View } from 'react-native'
import Colors from '../../assets/colors'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { HelperText } from 'react-native-paper'
import styles from './styles'

interface FormProps {
  email: string
  password: string
  name: string
}

const LOWERCASE_REGEX = /(?=.*[a-z])/
const UPPERCASE_REGEX = /(?=.*[A-Z])/
const NUMERICREGEX = /(?=.*[0-9])/

const signInForm: React.FC<FormProps> = ({ onSubmit }) => {
  const defaultFields = {
    email: 'a@aa.aa',
    password: '12qwQW',
    name: 'testtt',
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email('يرجى إدخال بريد إلكتروني صالح')
      .required('يرجى إدخال البريد الإلكتروني'),
    password: Yup.string()
      .matches(LOWERCASE_REGEX, 'يجب أن تحتوي على حرف واحد صغير على الأقل')
      .matches(UPPERCASE_REGEX, 'يجب أن تحتوي على حرف واحد كبير على الأقل')
      .matches(NUMERICREGEX, 'يجب أن تحتوي على رقم واحد على الأقل')
      .min(6, 'يجب أن تحتوي على 6 حقول على الأقل')
      .required('يرجى إدخال كلمة المرور'),
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
    <>
      <View style={styles.textInputContainer}>
        <TextInput
          onChangeText={(e) => {
            handleChange('email')
            let value = e || ''
            value = value.toLowerCase().trim()
            setFieldValue('email', value)
          }}
          value={values.email}
          onBlur={() => {
            setFieldTouched('email', true)
          }}
          label='البريد الإلكتروني'
          autoCompleteType='email'
          keyboardType='email-address'
          autoCorrect={false}
          autoCapitalize='none'
          textContentType='emailAddress'
        />
        <HelperText
          type='error'
          visible={errors.email && touched.email ? true : false}
        >
          {errors.email}
        </HelperText>
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          label='كلمة المرور'
          secureTextEntry
          onChangeText={handleChange('password')}
          value={values.password.trim()}
          onBlur={() => {
            setFieldTouched('password', true)
          }}
          autoCorrect={false}
          autoCapitalize='none'
          textContentType='password'
        />
        <HelperText
          type='error'
          visible={errors.password && touched.password ? true : false}
        >
          {errors.password}
        </HelperText>
      </View>

      <Button
        text='إنشاء الحساب'
        onPress={handleSubmit}
        icon='check'
        iconSize={22}
        loading={isSubmitting}
        style={styles.signUpBtn}
        textColor={Colors.textOnSurface}
        color={Colors.quaternary}
        hoverColor={Colors.quaternaryLight}
      />
    </>
  )
}

export default signInForm
