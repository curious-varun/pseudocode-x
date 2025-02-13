import { getProblemWithTestCaseById, GetProblemWithTestCaseByIdType } from "@/db/problem";
import { notFound } from "next/navigation";

export default async function ProblemPage({ params }: { params: { slug: string } }) {
  const data = await getProblemWithTestCaseById(params.slug);

  if (!data) return notFound();

  const { title, description, difficulty, testCases } = data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Problem: {title}</h1>
      <p className="text-gray-700">{description}</p>
      <p className="mt-2"><strong>Difficulty:</strong> {difficulty}</p>

      {testCases.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">Public Test Cases:</h2>
          <ul className="list-disc pl-6">
            {testCases.map((testCase) => (
              <li key={testCase.id} className="mt-2">
                <strong>Input:</strong> {testCase.inputs} <br />
                <strong>Output:</strong> {testCase.output}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

