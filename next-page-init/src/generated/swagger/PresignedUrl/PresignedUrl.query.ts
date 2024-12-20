import { useMutation } from '@tanstack/react-query'

import { AxiosError } from 'axios'

import instance from '@/configs/axios/instance'

import { MutationHookParams } from '../@types/react-query-type'
import { PresignedUrlApi } from './PresignedUrl.api'

/**
 * !DO NOT EDIT THIS FILE
 *
 * 스크립트가 실행될때, 파일을 항상 새로 쓰기 때문에 파일 수정시 작성내용이 제거 될 수 있습니다.
 */

/**
 * tok-cli.config.ts 에서 설정된 instance 경로의 axios instace 가 적용된, api 의 instance 입니다.
 */
export const presignedUrlApi = new PresignedUrlApi({ instance: instance })

/**
 * query key 에 undfined 를 포함시키지 않기 위한 함수입니다.
 */
const isDefined = (v: unknown) => typeof v !== 'undefined'

/**
 * query-keys
 */
export const QUERY_KEY_PRESIGNED_URL_API = {
  CONTROLLER_CREATE: () => ['PRESIGNED_URL_CONTROLLER_CREATE'],
}

/**
 * No description
 *
 * @tags presigned-url
 * @name PresignedUrlControllerCreate
 * @request POST:/presigned-url */

export const usePresignedUrlControllerCreateMutation = (
  params: MutationHookParams<
    typeof presignedUrlApi.presignedUrlControllerCreate,
    AxiosError<any>
  >,
) => {
  const mutationKey = QUERY_KEY_PRESIGNED_URL_API.CONTROLLER_CREATE()
  return useMutation({
    mutationKey,
    mutationFn: presignedUrlApi.presignedUrlControllerCreate,
    ...params?.options,
  })
}
