"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { ExternalLink } from "lucide-react";
import { DataTableColumnHeader } from "./table/data-table-column-hearder";
import { GetAllProblemType } from "@/db/problem";

export const problemColumns: ColumnDef<GetAllProblemType>[] = [
  {
    accessorKey: "status",
    header: "",
    cell: () => <> </>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    enableColumnFilter: true,
    enableSorting: true,
    accessorFn: (row) => row.title || "N/A",
    cell: ({ row }) => <p className="text-sm font-medium">{row.original.title}</p>,
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const difficulty = row.original.difficulty?.toLowerCase() || "";
      const color =
        difficulty === "easy"
          ? "text-[#00b8a3]"
          : difficulty === "mid"
            ? "text-[#ffc01e]"
            : difficulty === "hard"
              ? "text-red-500"
              : "text-gray-500";

      return <p className={`text-sm font-medium ${color}`}>{difficulty}</p>;
    },
  },
  {
    accessorKey: "link",
    header: "Problem Link",
    enableSorting: false,
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

export function ProblemSetTable({ problems }: { problems: GetAllProblemType[] }) {
  return (
    <div>
      <DataTable columns={problemColumns} data={problems} />
    </div>
  );
}
