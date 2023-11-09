"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { CommentVote, VoteType } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useToast } from "@/hooks/use-toast";
import { CommentVoteRequest } from "@/lib/validators/vote";
import { cn } from "@/lib/utils";

interface CommentVotesProps {
  commentId: string;
  initialVoteAmount: number;
  initialVote?: Pick<CommentVote, "type">;
}

export const CommentVotes = ({
  commentId,
  initialVoteAmount,
  initialVote,
}: CommentVotesProps) => {
  const [votesAmount, setVotesAmount] = useState<number>(initialVoteAmount);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const previousVote = usePrevious(currentVote);

  const { loginToast } = useCustomToast();
  const { toast } = useToast();

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: CommentVoteRequest = {
        commentId,
        voteType,
      };

      await axios.patch("/api/subreddit/post/comment/vote", payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") {
        setVotesAmount((prev) => prev - 1);
      } else {
        setVotesAmount((prev) => prev + 1);
      }

      setCurrentVote(previousVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered, please try again",
        variant: "destructive",
      });
    },
    onMutate: (type) => {
      if (currentVote?.type === type) {
        setCurrentVote(undefined);
        if (type === "UP") {
          setVotesAmount((prev) => prev - 1);
        } else if (type === "DOWN") {
          setVotesAmount((prev) => prev + 1);
        }
      } else {
        setCurrentVote({ type });
        if (type === "UP") {
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        } else if (type === "DOWN") {
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1));
        }
      }
    },
  });

  return (
    <div className="flex gap-1">
      <Button
        onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn(
            "h-5 w-5 text-zinc-700",
            currentVote?.type === "UP" && "text-emerald-500 fill-emerald-500"
          )}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmount}
      </p>
      <Button
        onClick={() => vote("DOWN")}
        size="sm"
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn(
            "h-5 w-5 text-zinc-700",
            currentVote?.type === "DOWN" && "text-red-500 fill-red-500"
          )}
        />
      </Button>
    </div>
  );
};
