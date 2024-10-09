// next-page-init/scripts/plugin-text.ts
import { writeFileSync } from 'fs'

import { defineCommand } from '@toktokhan-dev/cli'

/**
 * 플러그인의 config 타입을 정의합니다.
 *
 * - tok-cli.config.ts 에서 해당 플러그인의 option 을 정의할 때 사용됩니다.
 * - config 파일은 js, ts 이기 때문에, 옵션 객체의 각 property 는 함수, 배열 등 어떤 타입이든 정의 가능합니다.
 * - run 함수의 인자 type 으로 사용됩니다.
 */
export type GenTxtConfig = {
  input: string
  output: string
}

export const printText = defineCommand<'print:text', GenTxtConfig>({
  /**
   * 플러그인의 이름을 정의합니다.
   *
   * - tokript {command} 로 실행됩니다.
   * - tok-cli.config 에서 옵션 정의시 해당 옵션의 key 값으로 사용됩니다.
   */
  name: 'print:text',
  /**
   * 플러그인의 설명을 정의합니다.
   *
   * - tokript help 실행시 표기됩니다.
   */
  description: '텍스트 파일을 생성합니다.',
  /**
   * 플러그인 실행시 사용할 config 의 기본값을 정의합니다.
   *
   * - 특정 옵션이 `--output` 과 같은 `cli option` 이나 `tok-cli.config.ts` 에 정의 되지 않았을 때 사용됩니다.
   */
  default: {
    output: './src/generated/print-text.txt',
  },
  /**
   * --output, -o 와 같은 cli option 을 정의합니다.
   *
   * - cli option 에 정의되지 않은 옵션은 오직 config 파일에서만 정의 가능합니다.
   * - cli option 은 원시값, 원시값 배열과 같은 간단한 값만 사용 가능합니다. ex) string, string[]
   * - tokript help {command} 시 정의한 alias, 설명, 기본값을 확인할 수 있습니다.
   */
  cliOptions: [
    {
      name: 'output',
      alias: 'o',
      description: '생성될 txt 파일의 경로입니다.',
      type: 'string',
    },
    {
      name: 'input',
      alias: 'i',
      description: '출력할 문자입니다.',
      type: 'string',
    },
  ],
  /**
   * 플러그인 실행 함수를 정의합니다.
   *
   * - config: GenTxtConfig 타입의 config 객체가 인자로 넘어옵니다.
   * - config 객체는 default, cli option, tok-cli.config.ts 에 정의된 값들이 합쳐진 값입니다.
   * - config 우선순위는 cli option > tok-cli.config.ts > default 입니다.
   * - run 함수는 플러그인의 실제 동작을 정의합니다.
   */
  run: (config) => {
    const print = (input: string, output: string) => {
      if (!input) throw new Error('input is required')
      if (!output) throw new Error('output is required')

      writeFileSync(output, input)
    }

    print(config.input, config.output)
  },
})
