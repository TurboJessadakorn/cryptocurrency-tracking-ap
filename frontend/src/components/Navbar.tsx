import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { useEffect, useState } from 'react';
import { registerUser, signInUser, getUserInfo } from '../services/api/auth';
import { useNavigate } from 'react-router-dom';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isSignInOpen, onOpen: onSignInOpen, onClose: onSignInClose } = useDisclosure();
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const user = await getUserInfo();
      setUsername(user.username);
    } catch (error) {

    }
  };

  const handleSignUp = async () => {
    try {
      await registerUser(signUpUsername, signUpPassword);
      toast({
        title: 'Account created.',
        description: 'Your account has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      onSignUpClose();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleSignIn = async () => {
    try {
      await signInUser(signInUsername, signInPassword);
      fetchUser();
      toast({
        title: 'Signed in.',
        description: 'You have signed in successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      onSignInClose();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUsername(null);
    navigate('/');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box position={'fixed'} w={'100%'} top={'0'} left={'0'} zIndex={'100'} shadow={'sm'}>
      <Flex
        bg={'#27293A'}
        color={'white'}
        minH={'80px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.900'}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            colorScheme='white'
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <img src='http://kryptodian.com/wp-content/uploads/2022/03/Logo-white.svg'></img>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={8}>
          {username ? (
            <>
              <Button fontSize={'md'} fontWeight={400} variant={'link'} color={'gray.200'} onClick={handleLogout} mr={5}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={'a'} fontSize={'md'} fontWeight={400} variant={'link'} onClick={onSignInOpen} color={'gray.200'} cursor={'pointer'}>
                Sign In
              </Button>
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'md'}
                cursor={'pointer'}
                fontWeight={600}
                color={'white'}
                bg={'#5142FF'}
                onClick={onSignUpOpen}
                _hover={{
                  bg: '8379fd',
                }}>
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>

      {/* Sign In Modal */}
      <Modal isOpen={isSignInOpen} onClose={onSignInClose}>
        <ModalOverlay />
        <ModalContent bg={'gray.800'} p={'6'}>
          <ModalHeader fontSize={'3xl'} fontWeight={'700'}>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSignIn} w={'100%'}>
              Sign In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Sign Up Modal */}
      <Modal isOpen={isSignUpOpen} onClose={onSignUpClose} >
        <ModalOverlay />
        <ModalContent bg={'gray.800'} p={'6'}>
          <ModalHeader fontSize={'3xl'} fontWeight={'700'}>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSignUp} w={'100%'}>
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = 'gray.200'
  const linkHoverColor = 'white'
  const popoverContentBgColor = 'gray.800'
  const navigate = useNavigate();
  const toast = useToast();

  const handleNavigation = (href: string) => {
    if(href == '/portfolio' && !localStorage.getItem('accessToken')){
      toast({
        description: 'Please sign in before edit portfolio',
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } else {
      navigate(href);
    }
  };

  return (
    <Stack direction={'row'} spacing={2}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                cursor={'pointer'}
                as="a"
                p={6}
                onClick={() => handleNavigation(navItem.href ?? '#')}
                fontSize={'md'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      cursor={'pointer'}
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: 'gray.900' }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={'#27293A'} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()
  const navigate = useNavigate();
  
  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        onClick={() => handleNavigation(href ?? '#')}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={'gray.200'}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={'gray.700'}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
  },
]
