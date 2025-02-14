"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface DataTableSearchProps<TData> {
  table: Table<TData>
}

export function DataTableSearch<TData>({
  table,
}: DataTableSearchProps<TData>) {
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    table.getColumn("title")?.setFilterValue(value)
  }

  return (
    <div className="flex items-center">
      <Input
        placeholder="Search problems by title..."
        onChange={handleSearchChange}
        className="max-w-sm"
      />
    </div>
  )
}
