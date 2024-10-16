import { SocialLoginDtoTypeEnumType } from '@/generated/swagger/@types/data-contracts'

export type OauthCallback = {
  returnUrl: string
  type: SocialLoginDtoTypeEnumType
  // type: SocialLoginDtoTypeEnumType -> 'kakao' | 'google' | ...
}
