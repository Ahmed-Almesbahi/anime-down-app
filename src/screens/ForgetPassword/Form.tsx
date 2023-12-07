import React from 'react'
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
}

const signInForm: React.FC<FormProps> = ({ onSubmit }) => {
  const defaultFields = {
    email: 'q@q.q',
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email('يرجى إدخال بريد إلكتروني صالح')
      .required('يرجى إدخال البريد الإلكتروني'),
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
      <Button
        text='استعادة كلمة المرور'
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
