import { useMemo } from 'react'

import { Card, Text } from '@chakra-ui/react'
import { InfinityList } from '@toktokhan-dev/chakra'

import TemplateLayout from '@/components/@Templates/TemplateLayout'
import { usePostsControllerFindAllInfiniteQuery } from '@/generated/swagger/Posts/Posts.query'

function Home() {
  const { data, hasNextPage, isFetching, fetchNextPage } =
    usePostsControllerFindAllInfiniteQuery({
      variables: {
        query: {
          limit: 5,
        },
      },
      options: {
        select: (data) => data.pages.flatMap((page) => page.result || []), // 1차원 배열로 변경
      },
    })

  const posts = useMemo(() => data ?? [], [data])

  return (
    <TemplateLayout title="HOME">
      <InfinityList
        data={posts}
        hasMore={hasNextPage}
        isFetching={isFetching}
        onFetchMore={fetchNextPage}
        renderItem={(post) => (
          <Card
            key={post.id}
            p="25px"
            gap="10px"
            borderRadius="16px"
            w="100%"
            h="144px"
            bg="background.primary"
            direction="column"
            mb="20px"
          >
            <Text textStyle="pre-heading-03">{post.title}</Text>
            <Text textStyle="pre-body-03" color="text.secondary">
              {post.content}
            </Text>
          </Card>
        )}
      />
    </TemplateLayout>
  )
}

export default Home
