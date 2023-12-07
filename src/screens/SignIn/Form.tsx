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
}

const signInForm: React.FC<FormProps> = ({ onSubmit }) => {
  const defaultFields = {
    email: 'q@q.q',
    password: '12qwQW',
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email('يرجى إدخال بريد إلكتروني صالح')
      .required('يرجى إدخال البريد الإلكتروني'),
    password: Yup.string().required('يرجى إدخال كلمة المرور'),
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
          // onBlur={handleBlur('email')}
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
          // onBlur={handleBlur('password')}
          onBlur={() => setFieldTouched('password', true)}
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
        text='تسجيل الدخول'
        onPress={handleSubmit}
        icon='chevron-left'
        iconSize={28}
        loading={isSubmitting}
        style={styles.signInBtn}
        textHoverColor={Colors.textOnPrimary}
      />
    </>
  )
}

export default signInForm
