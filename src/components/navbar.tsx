import { HStack, Icon, IconButton, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import siteConfig from 'site-config'

import { useSocials } from '@/hook/app'
import routes from '@/routes'

const Navbar = () => {
  const socials = useSocials()

  return (
    <HStack as='nav' fontSize='md' px={{ base: 5, md: 20 }} py={2} spacing={8}>
      <NextLink href='/'>
        <Link fontWeight='bold' href='/' variant='link'>
          {siteConfig.title}
        </Link>
      </NextLink>

      <HStack d={{ base: 'none', md: 'flex' }} spacing={10}>
        {routes.map(([text, href, isExternal = false]) => (
          <React.Fragment key={href}>
            {isExternal ? (
              <Link href={href} isExternal>
                {text}
              </Link>
            ) : (
              <NextLink href={href} key={href}>
                <Link href={href}>{text}</Link>
              </NextLink>
            )}
          </React.Fragment>
        ))}
      </HStack>

      <HStack
        flexGrow={1}
        justify='flex-end'
        p={4}
        spacing={{ base: 0, md: 2 }}
      >
        {socials.map(([href, SocialIcon]) => (
          <IconButton
            as='a'
            aria-label={href}
            color='currentColor'
            href={href}
            icon={<Icon as={SocialIcon} boxSize={5} />}
            key={href}
            variant='link'
          />
        ))}
      </HStack>
    </HStack>
  )
}

export default Navbar
