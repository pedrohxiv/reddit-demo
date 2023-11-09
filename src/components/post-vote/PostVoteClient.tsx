"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { VoteType } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { PostVoteRequest } from "@/lib/validators/vote";
import { useToast } from "@/hooks/use-toast";

interface PostVoteClientProps {
  postId: string;
  initialVoteAmount: number;
  initialVote?: VoteType | null;
}

export const PostVoteClient = ({
  postId,
  initialVoteAmount,
  initialVote,
}: PostVoteClientProps) => {
  const [votesAmount, setVotesAmount] = useState<number>(initialVoteAmount);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const previousVote = usePrevious(currentVote);

  const { loginToast } = useCustomToast();
  const { toast } = useToast();

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      };

      await axios.patch("/api/subreddit/post/vote", payload);
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
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === "UP") {
          setVotesAmount((prev) => prev - 1);
        } else if (type === "DOWN") {
          setVotesAmount((prev) => prev + 1);
        }
      } else {
        setCurrentVote(type);
        if (type === "UP") {
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        } else if (type === "DOWN") {
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1));
        }
      }
    },
  });

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn(
            "h-5 w-5 text-zinc-700",
            currentVote === "UP" && "text-emerald-500 fill-emerald-500"
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
            currentVote === "DOWN" && "text-red-500 fill-red-500"
          )}
        />
      </Button>
    </div>
  );
};
