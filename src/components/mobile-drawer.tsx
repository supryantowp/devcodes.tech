import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import { useSocials } from '@/hook/app'
import routes from '@/routes'
import siteConfig from '~/site-config'

const MobileDrawer = () => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  const btnRef = React.useRef()
  const socials = useSocials()

  return (
    <>
      <Box bottom={0} d={{ md: 'none' }} p={8} pos='fixed' right={0} zIndex={1}>
        <IconButton
          aria-label='open-menu'
          icon={<Icon as={isOpen ? FaTimes : FaBars} />}
          onClick={onToggle}
          ref={btnRef}
          isRound
          size='lg'
          colorScheme='navy'
        />
      </Box>

      <Drawer
        finalFocusRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader p={8}>
              <NextLink href='/'>
                <Link variant='link' onClick={onClose}>
                  {siteConfig.title}
                </Link>
              </NextLink>
            </DrawerHeader>

            <DrawerBody
              as={Stack}
              fontSize='lg'
              justify='center'
              p={8}
              spacing={9}
            >
              {[['Home', '/'], ...routes].map(
                ([text, href, isExternal = false]) => (
                  <React.Fragment key={href}>
                    {isExternal ? (
                      <Link href={href} isExternal onClick={onClose}>
                        {text}
                      </Link>
                    ) : (
                      <NextLink href={href}>
                        <Link href={href} onClick={onClose}>
                          {text}
                        </Link>
                      </NextLink>
                    )}
                  </React.Fragment>
                )
              )}
            </DrawerBody>

            <DrawerFooter justifyContent='flex-start' px={4} py={8}>
              {socials.map(([href, SocialIcons]) => (
                <IconButton
                  as='a'
                  aria-label={href}
                  color='currentcolor'
                  href={href}
                  icon={<Icon as={SocialIcons} boxSize={6} />}
                  key={href}
                  size='lg'
                  variant='link'
                />
              ))}
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileDrawer
