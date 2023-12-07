import React, { useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  TouchableRipple,
} from 'react-native-paper';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import './css.css'
import styles from './styles';
import Colors from '../../assets/colors';
import { useHover } from '@huse/hover';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT } from '../User/ducks';
import * as RootNavigation from '../../navigation/RootNavigation';
import { isHasActiveSubscription as _isHasActiveSubscription } from '../../utils/helper';
import SignIn from '../SignIn'
import ForgetPassword from '../ForgetPassword'
import SignUp from '../SignUp'




const Header = () => {
  // const navigation = useNavigation()
  const signIn = useRef(null)
  const signUp = useRef(null)
  const forgetPassword = useRef(null)

  const switchSignInToSignUp = () => {
    signIn.current.hide()
    setTimeout(() => signUp.current.show(), 150)
  }
  const switchSignUpToSignIn = () => {
    signUp.current.hide()
    setTimeout(() => signIn.current.show(), 150)
  }
  const switchSignInToForgetPassword = () => {
    signIn.current.hide()
    setTimeout(() => forgetPassword.current.show(), 150)
  }
  // console.log('---------navigation', navigation)

  const { user } = useSelector((state) => ({
    user: state.user
  }));

  const dispatch = useDispatch();
  const signOut = () => dispatch({
    type: SIGN_OUT,
  });
  const isHasActiveSubscription = _isHasActiveSubscription()

  const menuList = ({ name, onPress, icon, isNotSignedIn }) => {
    const [isHover, hoverCallbacks] = useHover(undefined);
    if (!isHasActiveSubscription && !isNotSignedIn) {
      return (null)
    } else {
      return (
        <View {...hoverCallbacks}>

          <TouchableRipple
            onPress={onPress}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 30,
              position: 'relative',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: isHover ? Colors.textOnPrimary : Colors.textOnPrimaryLight }}>
                {name}
              </Text>
              {icon ?
                <MaterialCommunityIcons
                  name={icon}
                  size={20}
                  style={{ marginHorizontal: 5 }}
                  color={isHover ? Colors.textOnPrimary : Colors.textOnPrimaryLight}
                />
                : null}
            </View>
          </TouchableRipple>
        </View>
      )
    }
  }

  const menuItems = (item, onPress) => (
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={onPress}>
      <div className='hoverAccountIteamDropDownList'>
        <p className='accountIteamDropDownList'>{item}</p>
      </div>
    </TouchableRipple>
  )

  const account = () => {
    if (user.id > 0) {
      return (
        <View style={styles.myAccount}>

          {menuList({ name: 'بحث', onPress: () => console.log('search'), icon: 'magnify' })}
          <div className='mainMenuIteam' >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.imageContainer}>
                <Image
                  source={user?.selectedProfile?.Image?.url}
                  // alt='itemPicture'
                  style={styles.image}
                />
              </View>
              <MaterialCommunityIcons
                name='chevron-down'
                size={20}
                style={{ marginHorizontal: 5, color: Colors.surface }}
              />

              <div className='accountDropDownList'>
                {menuItems('إدارة الملفات الشخصية', () => RootNavigation.navigate('Profiles'))}
                {menuItems('حسابي', () => RootNavigation.navigate('Account'))}
                {/* {menuItems('المفضلة', () => console.log('pressed'))} */}
                {menuItems('المدفوعات', () => RootNavigation.navigate('Payments'))}
                {menuItems('تسجيل خروج', () => {
                  signOut()
                  setTimeout(() => RootNavigation.navigate('Launcher'), 50)
                }
                )}
              </div>

            </View>
          </div>

        </View>
      )
    } else {
      return (
        <View style={styles.myAccount}>
          {/* {console.log('qqqqq', navigation)} */}
          {/* {menuList({name: 'تسجيل الدخول', onPress: () => props.navigation.('SignIn')})} */}
          <View style={{ alignSelf: 'center', marginRight: 15 }}>
            <Button
              onPress={() => signUp.current.show()}
              text='انضم إلى انمي داون'
              color={Colors.quaternary}
              textColor={Colors.black}
              hoverGlow={Colors.quaternary}
              hoverColor={Colors.quaternary}
              dark
            />
          </View>
          {menuList({ name: 'تسجيل الدخول', onPress: () => signIn.current.show(), isNotSignedIn: { true} })}
        </View>
      )
    }
    // return (
    //   { userId > 0
    //     ? 
    //   :
    //     <View style={styles.myAccount}>
    //       {/* {console.log('qqqqq', navigation)} */}
    //       {/* {menuList({name: 'تسجيل الدخول', onPress: () => props.navigation.('SignIn')})} */}
    //       <View style={{ alignSelf: 'center', marginRight: 15 }}>
    //         {/* <Button
    //         onPress={() => signUp.current.show()}
    //         text='انضم إلى انمي داون'
    //         color={Colors.quaternary}
    //         textColor={Colors.black}
    //         hoverGlow={Colors.quaternary}
    //         hoverColor={Colors.quaternary}
    //         dark
    //       /> */}
    //       </View>
    //       {/* {menuList({ name: 'تسجيل الدخول', onPress: () => signIn.current.show(), isNotSignedIn: { true} })} */}
    //     </View>
    // }
  }

  return (
    <div
      className='headerBG'
    // style={{
    //   // flex: 1
    //   // position: 'fixed',
    //   // top: 0,
    //   // left: 0,
    //   // right: 0,
    //   height: 800,
    //   // zIndex: 300,
    //   // paddingHorizontal: 50
    //   // backgroundColor: radial - gradient(ellipse at bottom, rgba(121, 22, 221, .93), rgba(59, 0, 135, .93) 40 %, #3b0087);
    //   //       box- shadow: 0 0 30px 5px rgba(0, 0, 0, .8);
    //   // border - bottom: 1px solid #7916dd;
    //   // flex - direction: row;
    //   // transition: all .3s cubic - bezier(0.6, .2, .1, 1) 0s;
    //   // display: flex;
    // }}
    >
      <View style={styles.mainMenu}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => isHasActiveSubscription ? RootNavigation.navigate('Home') : RootNavigation.navigate('Launcher')}>
          {/* <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('launcher')}> */}
          <img
            src={require('../../assets/images/animeDownLogo.png')}
            alt='itemPicture'
            className='logo'
          />
        </TouchableOpacity>
        {menuList({
          name: 'الرئيسية',
          onPress: () => RootNavigation.navigate('Home')
        })}
        {menuList({ name: 'المسلسلات', onPress: () => RootNavigation.navigate('Category', { sort: 'series' }) })}
        {menuList({ name: 'الأفلام', onPress: () => RootNavigation.navigate('Category', { sort: 'movies' }) })}
        {menuList({ name: 'قائمتي', onPress: () => RootNavigation.navigate('Category', { sort: 'my-list' }) })}
      </View>

      <SignIn
        ref={signIn}
        switchSignInToSignUp={switchSignInToSignUp}
        switchSignInToForgetPassword={switchSignInToForgetPassword}
        navigation={RootNavigation}
      />
      <SignUp
        ref={signUp}
        switchSignUpToSignIn={switchSignUpToSignIn}
        navigation={RootNavigation}
      />
      <ForgetPassword
        ref={forgetPassword}
        navigation={RootNavigation}
      />
      {account()}

    </div>
  )
};

export default Header;
