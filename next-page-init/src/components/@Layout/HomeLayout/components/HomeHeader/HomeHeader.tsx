import { Link } from '@chakra-ui/next-js'
import {
  Button,
  Container,
  ContainerProps,
  Flex,
  HStack,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { LogoIcon } from 'generated/icons/MyIcons'

import ClientOnly from '@/components/ClientOnly'
import { ROUTES } from '@/generated/path/routes'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/stores/local/state'

import HomeHeaderDrawer from './components/HomeHeaderDrawer'

const HomeHeader = ({ ...props }: ContainerProps) => {
  const { isOpen, onClose } = useDisclosure()
  const { isLogin } = useAuth()
  const resetToken = useLocalStorage((store) => store.reset)

  return (
    <Container
      display={'flex'}
      w={'100%'}
      alignItems={'center'}
      justifyContent="space-between"
      {...props}
    >
      <Flex alignItems={'center'} gap={'16px'}>
        <Link variant={'unstyled'} href={ROUTES.MAIN}>
          <LogoIcon boxSize={'74px'} color={'icon.brand'} />
        </Link>
        <Link variant={'unstyled'} href={ROUTES.PROFILE}>
          <Text textStyle={'pre-caption-01'} color={'text.primary'}>
            next-page-router 김보라
          </Text>
        </Link>
      </Flex>
      <HStack spacing="16px">
        <ClientOnly fallback={<Spinner size={'sm'} />}>
          {isLogin ?
            <Button
              variant={'line'}
              size={'sm'}
              onClick={() => resetToken('token')}
            >
              Logout
            </Button>
          : <Link
              color={'text.primary'}
              textStyle={'pre-caption-01'}
              variant={'line'}
              size={'sm'}
              href={ROUTES.LOGIN_MAIN}
            >
              Login
            </Link>
          }
        </ClientOnly>
        {/* <IconButton //
          size={'xs'}
          icon={<MenuIcon w="24px" h="24px" color={'content.1'} />}
          onClick={onOpen}
          cursor="pointer"
          bg="transparent"
          aria-label="btn-toggle-drawer"
        /> */}
      </HStack>
      <HomeHeaderDrawer isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default HomeHeader
