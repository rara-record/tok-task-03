// import { SocialLoginDtoTypeEnumType } from '@/generated/swagger/@types/data-contracts'

export type OauthCallback = {
  returnUrl: string
  type: string
  // type: SocialLoginDtoTypeEnumType -> 'kakao' | 'google' | ...
}
