import { Box } from '@chakra-ui/react'

interface SectionProps {
  children: React.ReactNode
}

export const Section = ({ children, ...props }: SectionProps) => {
  return (
    <Box px={8} py={2} {...props}>
      {children}
    </Box>
  )
}

export default Section
