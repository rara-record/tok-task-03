import { Card, CardBody, Container, Heading, Text } from '@chakra-ui/react'

import TemplateLayout from '@/components/@Templates/TemplateLayout'

function Profile() {
  return (
    <TemplateLayout title={'Profile'}>
      <Container
        px={'0px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'20px'}
      >
        <Card borderRadius={'16px'} boxShadow={'0px'}>
          <CardBody>
            <Heading textStyle={'pre-heading-03'} color={'text.primary'}>
              Title
            </Heading>
            <Text
              pt="2"
              fontStyle={'pre-body-03'}
              color={'text.secondary'}
              noOfLines={2}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </CardBody>
        </Card>

        <Card borderRadius={'16px'} boxShadow={'0px'}>
          <CardBody>
            <Heading textStyle={'pre-heading-03'} color={'text.primary'}>
              Title
            </Heading>
            <Text
              pt="2"
              fontStyle={'pre-body-03'}
              color={'text.secondary'}
              noOfLines={2}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </CardBody>
        </Card>

        <Card borderRadius={'16px'} boxShadow={'0px'}>
          <CardBody>
            <Heading textStyle={'pre-heading-03'} color={'text.primary'}>
              Title
            </Heading>
            <Text
              pt="2"
              fontStyle={'pre-body-03'}
              color={'text.secondary'}
              noOfLines={2}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </CardBody>
        </Card>

        <Card borderRadius={'16px'} boxShadow={'0px'}>
          <CardBody>
            <Heading textStyle={'pre-heading-03'} color={'text.primary'}>
              Title
            </Heading>
            <Text
              pt="2"
              fontStyle={'pre-body-03'}
              color={'text.secondary'}
              noOfLines={2}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </CardBody>
        </Card>
      </Container>
    </TemplateLayout>
  )
}
export default Profile
