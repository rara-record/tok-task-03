import { Card, CardBody, Container, Heading, Text } from '@chakra-ui/react'

import TemplateLayout from '@/components/@Templates/TemplateLayout'
import { useAuthControllerGetProfileQuery } from '@/generated/swagger/Auth/Auth.query'

function Profile() {
  const { data } = useAuthControllerGetProfileQuery()

  return (
    <TemplateLayout title={'MY PROFILE'}>
      <Container
        px={'0px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'20px'}
      >
        <Card borderRadius={'16px'} boxShadow={'0px'}>
          <CardBody>
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
      </Container>
    </TemplateLayout>
  )
}
export default Profile
