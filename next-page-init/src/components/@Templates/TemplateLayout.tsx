import { PropsWithChildren } from 'react'

import { Container, ContainerProps, HStack, Tag, Text } from '@chakra-ui/react'

interface TemplateLayoutProps extends ContainerProps {
  title: string
}

const TemplateLayout = ({
  title,
  children,
  ...props
}: PropsWithChildren<TemplateLayoutProps>) => {
  return (
    <Container {...props}>
      <HStack mb={'50px'} />
      <Tag
        background={'background.brand.inverse'}
        color={'text.primary.inverse'}
        textStyle={'pre-heading-05'}
        borderRadius={'999px'}
      >
        {title}
      </Tag>
      <HStack mb={'20px'} />
      {children}
    </Container>

    // <Container {...props}>
    //   <Text
    //     pt={[0, '48px']}
    //     pb={'24px'}
    //     mb={'16px'}
    //     textAlign="left"
    //     textStyle="pre-heading-01"
    //     whiteSpace={'pre-line'}
    //   >
    //     {title}
    //   </Text>
    //   {children}
    // </Container>
  )
}

export default TemplateLayout
