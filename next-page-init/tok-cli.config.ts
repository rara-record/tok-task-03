import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'
import { genApi } from '@toktokhan-dev/cli-plugin-gen-api-react-query'
import { genIcon } from '@toktokhan-dev/cli-plugin-gen-icon-chakra'
import { genImg } from '@toktokhan-dev/cli-plugin-gen-img'
import { genRoutePage } from '@toktokhan-dev/cli-plugin-gen-route-pages'
import { genTheme } from '@toktokhan-dev/cli-plugin-gen-theme-chakra'

import { printText } from './src/scripts/plugin-text'

const config: RootConfig<{
  plugins: [
    typeof genImg,
    typeof genRoutePage,
    typeof genApi,
    typeof genTheme,
    typeof genIcon,
    typeof commit,
    typeof printText,
  ]
}> = {
  plugins: [genImg, genRoutePage, genApi, genTheme, genIcon, commit, printText],
  'gen:img': {
    input: 'public/images',
    oneDepth: true,
    basePath: '/images',
  },
  'gen:route': {
    oneDepth: true,
  },
  'gen:api': {
    swaggerSchemaUrl: 'http://localhost:5001/api-json',
    output: 'src/generated/swagger',
    includeReactQuery: true,
    includeReactInfiniteQuery: true,
    instancePath: '@/configs/axios/instance',
    paginationSets: [
      {
        keywords: ['cursor', 'limit'],
        nextKey: 'cursor',
        getNextPageParam: `(lastPage) => { return lastPage.next }`,
      },
    ],
  },
  'gen:theme': {
    tokenModes: {
      colors: {
        light: 'fake-light',
        dark: 'dark',
      },
      textStyles: {
        base: 'mobile',
        sm: 'tablet',
        md: 'desktop',
      },
    },
  },
  'gen:icon': {
    input: 'public/icons',
  },
  'print:text': {
    input: 'hello world!',
  },
}
export default config
