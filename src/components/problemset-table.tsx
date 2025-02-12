"use client";
import { getAllProblemType } from "@/db/problem";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
export const problemColumns: ColumnDef<getAllProblemType>[] = [
  {
    accessorKey: "id",
    header: () => <div className="ml-20">Problem ID</div>,
    cell: ({ row }) => (
      <p className="ml-20 text-sm font-medium">{row.original.id}</p>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    enableColumnFilter: true,
    accessorFn: (row) => row.title || "N/A",
    cell: ({ row }) => <p className="text-sm font-medium">{row.original.title}</p>,
  },
  {
    accessorKey: "dificulty",
    header: "Difficulty",
    cell: ({ row }) => <p className="text-sm font-medium">{row.original.dificulty}</p>,
  },
];



export function ProblemSetTable({ problems }: { problems: getAllProblemType[] }) {
  return (
    <div>
      <DataTable columns={problemColumns} data={problems} />
    </div>
  )
}



