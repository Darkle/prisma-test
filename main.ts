import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.post.create({ data: { postId: 'post-1', feedDomain: 'reddit.com', feedName: 'aww' } })

  await prisma.post.create({ data: { postId: 'post-2', feedDomain: 'reddit.com', feedName: 'aww' } })

  await prisma.tag.create({ data: { tag: 'tag-1' } })

  const post = await prisma.post.findFirst({
    where: { postId: 'post-1', feedDomain: 'reddit.com', feedName: 'aww' },
  })

  await prisma.post.update({
    where: { uniqueId: post?.uniqueId as string },
    data: { tags: { connect: { tag: 'tag-1' } } },
  })

  const posts = await prisma.post.findMany({
    where: { tags: { every: { tag: { in: ['tag-1'] } } } },
    include: { tags: true },
  })

  console.dir(posts, { depth: Infinity })
}

main()
  .then(() => {
    console.log('finished')
  })
  .catch(err => {
    console.error(err)
  })
