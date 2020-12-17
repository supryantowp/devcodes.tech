import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
import type { IconType } from 'react-icons/lib'

import siteConfig from '~/site-config'

export function useSocials() {
  const socials: [string, IconType][] = [
    [siteConfig.socials.GitHub, FaGithub],
    [siteConfig.socials.Instagram, FaInstagram],
  ]
  return socials
}
