"use client";
import { getAllProblemType } from "@/db/problem";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { ExternalLink } from "lucide-react";
export const problemColumns: ColumnDef<getAllProblemType>[] = [
  {
    accessorKey: "status",
    header: "",
    cell: () => <> </>
    ,
  },
  {
    accessorKey: "title",
    header: "Title",
    enableColumnFilter: true,
    accessorFn: (row) => row.title || "N/A",
    cell: ({ row }) => <p className="text-sm font-medium">{row.original.title}</p>,
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty?.toLowerCase() || "";
      const color =
        difficulty === "easy"
          ? "text-[#00b8a3]"
          : difficulty === "mid"
            ? "text-[#ffc01e]"
            : difficulty === "hard"
              ? "text-red-500"
              : "text-gray-500"; // Default color for unknown

      return <p className={`text-sm font-medium ${color}`}>{difficulty}</p>;
    },
  },


  {
    accessorKey: "link",
    header: "Problem Link",
    cell: ({ row }) => (
      <Link
        className="hover:text-blue-600"
        href={`/problem/${row.original.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
      >
        <ExternalLink />
      </Link>
    ),
  }
];



export function ProblemSetTable({ problems }: { problems: getAllProblemType[] }) {
  return (
    <div>
      <DataTable columns={problemColumns} data={problems} />
    </div>
  )
}



