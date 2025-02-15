"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/markdown-renderer";
import { decreaseShowSolutionPoint } from "@/actions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

export function RenderSolution({ solution, userId }: { solution: string; userId: string }) {
  const [showSolution, setShowSolution] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  async function handleShowSolution() {
    setOpenConfirmDialog(false);
    startTransition(async () => {
      const res = await decreaseShowSolutionPoint(userId);
      if (res.success) {
        setShowSolution(true);
      } else {
        toast.error("Something went wrong while deducting points.");
      }
    });
  }

  if (showSolution) {
    return <MarkdownRenderer content={solution.replace(/\\n/g, "\n")} />;
  }

  return (
    <div className="max-w-lg mx-auto p-6 text-center bg-white shadow-md rounded-lg border">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h2>
      <p className="text-sm text-gray-600">
        Try solving the problem on your own first. If you're stuck, you can view the solution.
      </p>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Viewing the solution will deduct <span className="text-red-500 font-medium">10 points</span>.
        </p>
        <Button
          variant="outline"
          onClick={() => setOpenConfirmDialog(true)}
          disabled={isPending}
          className="mt-2 text-gray-800 border-gray-300 hover:bg-gray-100"
        >
          {isPending ? "Loading..." : "View Solution"}
        </Button>

        <AlertDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                Viewing the solution will deduct <span className="text-red-500 font-medium">10 points</span>. Do you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleShowSolution} disabled={isPending}>
                {isPending ? "Loading..." : "Yes, Show Solution"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
