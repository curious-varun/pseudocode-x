import { getAllProblem, getAllProblemType } from "@/db/problem";

export default async function ProblemsetPage() {
  const problems: getAllProblemType[] = await getAllProblem();
  return (
    <div>
      instide probleset page page.tsx
    </div>
  );
} 
