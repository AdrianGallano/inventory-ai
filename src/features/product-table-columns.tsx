'use client'
import * as React from "react"

import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Product from "./products/domains/Product"
import ProductRowActionDropDown from "./products/product-row-action-dropdown"
import {
    ColumnDef
} from "@tanstack/react-table"

export const columns = (onEdit: (product: Product) => void, onDelete: (id: string) => void): ColumnDef<Product>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ID",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ID
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ID")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("category")}</div>,
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantity
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("quantity")}</div>,
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("price")}</div>,
        sortingFn: (rowA, rowB, columnId) => {
            const a = parseFloat(rowA.getValue(columnId)) || 0;
            const b = parseFloat(rowB.getValue(columnId)) || 0;
            return a - b; // Ascending order
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return (
                <ProductRowActionDropDown
                    product={row.original}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )
        },
    },
]