import { defineStyle } from '@chakra-ui/react'

import { textStyles } from '@/generated/tokens/text-styles'

export const sizes = {
  lg: defineStyle({
    px: '28px',
    minH: '32px',
    borderRadius: '10px',
    ...textStyles['pre-heading-05'],
  }),
  md: defineStyle({
    px: '20px',
    minH: '25px',
    borderRadius: '4px',
    ...textStyles['pre-caption-01'],
  }),
  sm: defineStyle({
    px: '14px',
    minH: '20px',
    borderRadius: '4px',

    ...textStyles['pre-caption-03'],
  }),
}
