import { notFound } from "next/navigation";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { MiniCreatePost } from "@/components/MiniCreatePost";
import { PostFeed } from "@/components/PostFeed";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

interface CommunityPageProps {
  params: {
    community: string;
  };
}

const CommunityPage = async ({ params: { community } }: CommunityPageProps) => {
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: community,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) {
    return notFound();
  }

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  );
};

export default CommunityPage;
