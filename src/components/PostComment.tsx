"use client";

import { useRef, useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { Comment, CommentVote, User } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import { CommentVotes } from "./CommentVotes";
import { Button } from "./ui/Button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { CommentRequest } from "@/lib/validators/comment";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

interface PostCommentProps {
  comment: Comment & { votes: CommentVote[]; author: User };
  votesAmount: number;
  currentVote: CommentVote | undefined;
  postId: string;
}

export const PostComment = ({
  comment,
  votesAmount,
  currentVote,
  postId,
}: PostCommentProps) => {
  const router = useRouter();

  const commentRef = useRef<HTMLDivElement>(null);

  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const { data: session } = useSession();
  const { toast } = useToast();
  const { loginToast } = useCustomToast();

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.patch(
        `/api/subreddit/post/comment`,
        payload
      );

      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was an error.",
        description: "Could not create comment.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
      setIsReplying(false);
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>
      <div className="flex gap-2 items-center flex-wrap">
        <CommentVotes
          commentId={comment.id}
          initialVoteAmount={votesAmount}
          initialVote={currentVote}
        />
        <Button
          onClick={() => {
            if (!session) return router.push("/sign-in");
            setIsReplying(true);
          }}
          variant="ghost"
          size="xs"
          aria-label="reply"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Reply
        </Button>
        {isReplying ? (
          <div className="grid w-full gap-1.5">
            <Label>Your comment</Label>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="comment">Your comment</Label>
              <div className="mt-2">
                <Textarea
                  id="comment"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                  placeholder="What are your thoughts?"
                />
                <div className="mt-2 flex justify-end gap-2">
                  <Button
                    tabIndex={-1}
                    variant="subtle"
                    onClick={() => setIsReplying(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={isLoading}
                    disabled={input.length === 0}
                    onClick={() => {
                      if (!input) return;
                      postComment({
                        postId,
                        text: input,
                        replyToId: comment.replyToId ?? comment.id,
                      });
                    }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
