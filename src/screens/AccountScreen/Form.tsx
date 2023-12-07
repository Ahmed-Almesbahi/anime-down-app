import React, { useRef, useState } from 'react'
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

const signInForm: React.FC<FormProps> = ({ onSubmit, email }) => {
  const [state, setState] = useState(false)
  const emailRef = useRef(null)

  const defaultFields = {
    email: email,
    password: '******',
    newPassword: '',
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email('يرجى إدخال بريد إلكتروني صالح')
      .required('يرجى إدخال البريد الإلكتروني'),
    password: Yup.string().required('يرجى إدخال كلمة المرور'),
    newPassword: Yup.string(),
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
          label={'البريد الإلكتروني'}
          autoCompleteType='email'
          keyboardType='email-address'
          autoCorrect={false}
          autoCapitalize='none'
          textContentType='emailAddress'
          placeholder={values.email}
          editable={state}
          ref={emailRef}
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
          label={state ? 'كلمة المرور الحالية' : 'كلمة المرور'}
          secureTextEntry
          onChangeText={handleChange('password')}
          value={values.password.trim()}
          onBlur={() => setFieldTouched('password', true)}
          autoCorrect={false}
          autoCapitalize='none'
          textContentType='password'
          placeholder={values.password}
          editable={state}
        />
        <HelperText
          type='error'
          visible={errors.password && touched.password ? true : false}
        >
          {errors.password}
        </HelperText>
      </View>
      {state ? (
        <View style={styles.textInputContainer}>
          <TextInput
            label='كلمة المرور الجديدة'
            secureTextEntry
            onChangeText={handleChange('newPassword')}
            value={values.newPassword.trim()}
            onBlur={() => setFieldTouched('newPassword', true)}
            autoCorrect={false}
            autoCapitalize='none'
            textContentType='newPassword'
            editable={state}
          />
          <HelperText
            type='error'
            visible={errors.newPassword && touched.newPassword ? true : false}
          >
            {errors.newPassword}
          </HelperText>
        </View>
      ) : null}
      <View
        style={{
          justifyContent: 'flex-end',

          flex: 1,
        }}
      >
        {/* <Button
          text='تسجيل الدخول'
          onPress={handleSubmit}
          icon='chevron-left'
          iconSize={28}
          loading={isSubmitting}
          style={styles.signInBtn}
          textHoverColor={Colors.textOnPrimary}
        /> */}
        <Button
          text={state ? 'حفظ' : 'تعديل معلوماتي'}
          onPress={() => {
            console.log('state---', state)
            !state
              ? (emailRef.current.focus(),
                setFieldValue('password', ''),
                setState(true))
              : handleSubmit()
          }}
          icon={state ? 'check' : 'pencil'}
          iconSize={20}
          loading={isSubmitting}
          // style={styles.signInBtn}
          textHoverColor={Colors.textOnPrimary}
        />
      </View>
    </>
  )
}

export default signInForm
