import { Modal as Modal_, ModalContent } from 'react-native-modals'
import CustomAnimation from './customAnimation'
import React, { forwardRef, useState, useImperativeHandle } from 'react'
import Colors from '../../assets/colors'
import { IconButton } from 'react-native-paper'
import styles from './styles'
import { ScrollView } from 'react-native'

const Modal = forwardRef(({ children, style, closeIcon }, ref) => {
  const [state, setState] = useState({ visible: false })

  const show = () => {
    setState({ visible: true })
  }
  const hide = () => {
    setState({ visible: false })
  }
  useImperativeHandle(ref, () => {
    return {
      show: show,
      hide: hide,
    }
  })
  return (
    <>
      <Modal_
        visible={state.visible}
        onTouchOutside={() => {
          setState({ visible: false })
        }}
        modalAnimation={new CustomAnimation()}
        overlayBackgroundColor={Colors.primary}
        modalStyle={[styles.surface, style]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <ModalContent>
            {closeIcon ? (
              <IconButton
                style={styles.closeIcon}
                color={Colors.textOnSurfaceLight}
                icon='close'
                onPress={() => {
                  setState({ visible: false })
                }}
              />
            ) : null}
            {children}
          </ModalContent>
        </ScrollView>
      </Modal_>
    </>
  )
})

export default Modal

Modal.defaultProps = {
  closeIcon: true,
}
