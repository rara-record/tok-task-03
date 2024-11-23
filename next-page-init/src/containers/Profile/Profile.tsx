import { useState } from 'react'

import {
  Avatar,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  HStack,
  Heading,
  Tag,
  Text,
} from '@chakra-ui/react'
import { UploadTrigger } from '@toktokhan-dev/react-web'

import { uploadFile } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import ImageAsNext from '@/components/ImageAsNext'
import { useAuthControllerGetProfileQuery } from '@/generated/swagger/Auth/Auth.query'

function Profile() {
  const { data } = useAuthControllerGetProfileQuery()

  const [profileImage, setProfileImage] = useState<string>('')

  return (
    <>
      <Container>
        <HStack mb={'50px'} />
        <Flex justifyContent={'space-between'}>
          <Tag
            background={'background.brand.inverse'}
            color={'text.primary.inverse'}
            textStyle={'pre-heading-05'}
            borderRadius={'999px'}
          >
            MY PROFILE
          </Tag>
          <UploadTrigger
            by="onClick"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file && file.type.startsWith('image/')) {
                try {
                  const result = await uploadFile(file)

                  if (!result) return

                  console.log(result, 'result')
                  setProfileImage(result.url)
                  // refetchProfile();
                } catch (error) {
                  console.error('Error uploading profile image:', error)
                }
              } else {
                alert('Please select an image file.')
              }
            }}
          >
            <Button
              variant={'outline'}
              background={'button.tertiary'}
              borderColor={'border.brand'}
              color={'border.brand'}
              height={'25px'}
              borderRadius={'4px'}
              verticalAlign={'text-bottom'}
            >
              <Text textStyle={'pre-caption-01'}>프로필 업로드</Text>
            </Button>
          </UploadTrigger>
        </Flex>
        <HStack mb={'20px'} />
        <Flex flexDirection={'column'} gap={'20px'}>
          <Card borderRadius={'16px'} boxShadow={'0px'}>
            <CardBody>
              <ImageAsNext src={profileImage} width={44} height={44} alt="" />
              <Heading textStyle={'pre-heading-03'} color={'text.primary'}>
                Name
              </Heading>
              <Text
                pt="2"
                fontStyle={'pre-body-03'}
                color={'text.secondary'}
                noOfLines={2}
              >
                {data?.name || ''}
              </Text>
            </CardBody>
          </Card>
        </Flex>

        <HStack mb={'30px'} />

        <Flex justifyContent={'space-between'}>
          <Tag
            background={'background.brand.inverse'}
            color={'text.primary.inverse'}
            textStyle={'pre-heading-05'}
            borderRadius={'999px'}
          >
            Gallery
          </Tag>
          <UploadTrigger
            by="onClick"
            onChange={(e) => console.log(e.target.files?.[0])}
          >
            <Button
              variant={'outline'}
              background={'button.tertiary'}
              borderColor={'border.brand'}
              color={'border.brand'}
              height={'25px'}
              borderRadius={'4px'}
              verticalAlign={'text-bottom'}
            >
              <Text textStyle={'pre-caption-01'}>파일 여러개 업로드</Text>
            </Button>
          </UploadTrigger>
        </Flex>
      </Container>
    </>
  )
}
export default Profile
