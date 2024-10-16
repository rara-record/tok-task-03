import { ContentType, HttpClient, RequestParams } from '../@http-client'
import {
  CreatePresignedUrlDtoType,
  CreatePresignedUrlResponseDtoType,
} from '../@types/data-contracts'
import { DeepOmitReadOnly } from '../@types/util-types'

/**
 * !DO NOT EDIT THIS FILE
 *
 * 스크립트가 실행될때, 파일을 항상 새로 쓰기 때문에 파일 수정시 작성내용이 제거 될 수 있습니다.
 */

export class PresignedUrlApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags presigned-url
   * @name PresignedUrlControllerCreate
   * @request POST:/presigned-url
   */
  presignedUrlControllerCreate = (variables: {
    data: DeepOmitReadOnly<CreatePresignedUrlDtoType>
    params?: RequestParams
  }) =>
    this.request<CreatePresignedUrlResponseDtoType, any>({
      path: `/presigned-url`,
      method: 'POST',
      body: variables.data,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    })
}

//
