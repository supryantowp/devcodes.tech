import { Box, Divider, Stack, Text } from '@chakra-ui/react'

const Footer = () => (
  <Stack as='footer' pb={16} pt={8} spacing={8}>
    <Box px={8}>
      <Divider />
    </Box>
    <Box textAlign='center' px={8}>
      <Text color='gray.300' fontWeight='light'>
        © {new Date().getFullYear()} Devcodes • All rights reserved • Love from
        Ciamis
      </Text>
    </Box>
  </Stack>
)

export default Footer
