import { useRouter } from 'next/router'

import {
  Box,
  Code,
  Container,
  HStack,
  ListItem,
  UnorderedList,
  useColorMode,
} from '@chakra-ui/react'
import {
  Apple,
  AppleButton,
  AppleIconButton,
  Facebook,
  FacebookButton,
  FacebookIconButton,
  GOOGLE_AUTH_SCOPE,
  Google,
  GoogleButton,
  GoogleIconButton,
  Kakao,
  KakaoButton,
  KakaoIconButton,
  Naver,
  NaverButton,
  NaverIconButton,
  useOauthPopupListener,
} from '@toktokhan-dev/react-web'
import { assertItemOf } from '@toktokhan-dev/universal'

import Admonition from '@/components/@Templates/Admonition'
import TemplateLayout from '@/components/@Templates/TemplateLayout'
import { ENV } from '@/configs/env'
import { useAuthControllerSocialLoginMutation } from '@/generated/swagger/Auth/Auth.query'
import { useLocalStorage } from '@/stores/local/state'

import { OauthCallback } from '../Social/types/oauth'

const kakao = new Kakao(ENV.KAKAO_CLIENT_ID)
const naver = new Naver(ENV.NAVER_CLIENT_ID)
const google = new Google(ENV.GOOGLE_CLIENT_ID)
const facebook = new Facebook(ENV.FACEBOOK_CLIENT_ID)
const apple = new Apple(ENV.APPLE_CLIENT_ID)

function Login() {
  const router = useRouter()
  const { returnUrl } = router.query
  const { colorMode } = useColorMode()

  const { mutateAsync } = useAuthControllerSocialLoginMutation({
    options: {
      onError: (error) => {
        console.error('Social login failed:', error)
        // Handle error (e.g., show error message to user)
      },
    },
  })

  useOauthPopupListener<OauthCallback>({
    onSuccess: (res) => {
      if (!res?.code || !res.state) return // TODO: error handling

      assertItemOf(['kakao', 'google', 'naver'] as const, res.state.type)

      mutateAsync({
        data: {
          code: res.code,
          type: res.state.type,
        },
      }).then((res) => useLocalStorage.setState({ token: res }))
    },
    onFail: () => {
      console.log('fail')
    },
  })
  return (
    <TemplateLayout title={'LOGIN'}>
      <HStack>
        <KakaoIconButton
          colorMode={colorMode}
          labelStyle={{ display: 'none' }}
          onClick={() =>
            kakao.loginToPopup({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/login',
                type: 'kakao',
              },
            })
          }
        />
        <KakaoButton
          colorMode={colorMode}
          align={'left'}
          onClick={() =>
            kakao.loginToLink({
              redirect_uri: `${window.origin}/social/callback`,
              state: {
                returnUrl: returnUrl || '/',
                type: 'kakao',
              },
            })
          }
        />
      </HStack>
    </TemplateLayout>
  )
}

export default Login
