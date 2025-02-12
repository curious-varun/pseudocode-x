import { ProblemSetTable } from "@/components/problemset-table";
import { getAllProblem, getAllProblemType } from "@/db/problem";

export default async function ProblemsetPage() {
  const problems: getAllProblemType[] = await getAllProblem();
  return (
    <div>
      <ProblemSetTable problems={problems} />
    </div>
  );
} 
