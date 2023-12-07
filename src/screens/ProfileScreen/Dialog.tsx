import React, { forwardRef } from 'react'
import { View, Image, FlatList } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Colors from '../../assets/colors'
import Modal from '../../components/Modal'
import Text from '../../components/Text'
import styles from './styles'

const Dialog = forwardRef(({ data, onPress }, ref) => {
  return (
    <Modal ref={ref} style={{ width: 580, height: 700 }}>
      <View style={{ marginVertical: 30, alignItems: 'center' }}>
        <Text style={{ color: Colors.primary, fontSize: 28 }}>
          اختر صورة لملفك الشخصي
        </Text>
      </View>
      <FlatList
        data={data.images}
        scrollEnabled
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              marginVertical: 10,
              alignItems: 'center',
            }}
          >
            <TouchableRipple
              onPress={() => {
                onPress(index)
                ref.current.hide()
              }}
              style={{ borderRadius: 100 }}
            >
              <Image style={styles.image} source={item.url} />
            </TouchableRipple>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item) => item.id}
      />
    </Modal>
  )
})

export default Dialog
