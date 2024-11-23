import { useRouter } from 'next/router'

import { Button, Center } from '@chakra-ui/react'
import { useOauthLinkCallback } from '@toktokhan-dev/react-web'
import { assertItemOf } from '@toktokhan-dev/universal'

import { result } from 'lodash'

import Splash from '@/components/Splash'
import { useAuthControllerSocialLoginMutation } from '@/generated/swagger/Auth/Auth.query'
import { useLocalStorage } from '@/stores/local/state'

import { OauthCallback } from '../types/oauth'

const LinkCallback = () => {
  const router = useRouter()

  const { mutateAsync } = useAuthControllerSocialLoginMutation({
    options: {
      onError: (error) => {
        console.error('Social login failed:', error)
        // Handle error (e.g., show error message to user)
      },
    },
  })

  const result = useOauthLinkCallback<OauthCallback>({
    onSuccess: (res) => {
      if (!res?.code || !res?.state) return

      assertItemOf(['kakao', 'google', 'naver'] as const, res?.state.type)

      mutateAsync({
        data: {
          code: res.code,
          type: res.state.type,
        },
      }).then((res) => {
        useLocalStorage.setState({ token: res })
      })
    },
    onFail: (res) => {
      console.log('failed to login', res)
      // router.push(res.returnUrl || '/')
    },
  })

  if (result.isLoading) return <Splash />
  return (
    <Center flex={1} h={'100vh'}>
      <Button
        onClick={() => {
          router.push(result.data?.state?.returnUrl || '/')
        }}
      >
        로그인 성공
      </Button>
    </Center>
  )
}

export default LinkCallback
