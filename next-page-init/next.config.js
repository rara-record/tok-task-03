const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  // images: {
  //   domains: ['example.com'], // remote 이미지를 next image 로 랜더링하고싶다면 도메인을 설정해주세요
  // },

  /**
   * @description
   * transpilePackages 옵션은 Next.js에게 특정 패키지를 트랜스파일하도록 지시합니다.
   * - 빌드 과정에서 Next.js가 @chakra-ui/next-js 패키지를 해석하지 못함
   */
  transpilePackages: ['@chakra-ui/next-js'],
  swcMinify: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
      preventFullImport: true,
    },
    'lodash/fp': {
      transform: 'lodash/fp/{{member}}',
      preventFullImport: true,
    },
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: '*.s3.*.amazonaws.com',
      },
    ],
  },
})
