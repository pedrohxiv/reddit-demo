import Link from "next/link";

import { toast } from "./use-toast";
import { Button } from "@/components/ui/Button";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Button variant="outline">
          <Link href="/sign-in" onClick={() => dismiss()}>
            Login
          </Link>
        </Button>
      ),
    });
  };

  return { loginToast };
};
