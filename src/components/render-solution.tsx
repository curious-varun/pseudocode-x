import { db } from "@/db";
import MarkdownRenderer from "@/components/markdown-renderer";

export async function RenderSolution({ problemId }: { problemId: string }) {
  const solution = await db.solution.findUnique({
    where: { problemId },
  });

  if (!solution) {
    return <p className="text-gray-500">No solution available</p>;
  }

  return <MarkdownRenderer content={solution.solution.replace(/\\n/g, "\n")} />;
}

