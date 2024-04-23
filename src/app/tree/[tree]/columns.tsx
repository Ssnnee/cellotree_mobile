"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

import type { ColumnDef } from "@tanstack/react-table"
import { z } from "zod";
import { Button } from "~/components/ui/button";

// const relationSchema = z.object({
//  id: z.string(),
//  type: z.array(z.enum(["father", "mother", "spouse", "children"])),
//  memberId: z.string(),
// });


const memberSchema = z.object({
  id: z.string(),
  firstname: z.string().nullable(),
  lastname: z.string(),
  birthdate: z.date().nullable(),
  placeOfBirth: z.string().nullable(),
  avatarURL: z.string().nullable(),
  description: z.string().nullable(),
  treeId: z.string(),
})

export type Member = z.infer<typeof memberSchema>;

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "firstname",
    header: "Prénoms",
  },
  {
    accessorKey: "lastname",
    header: "Nom",
  },
  {
    accessorKey: "birthdate",
    header: ()=> <div className="text-center">Date de naissance</div>,
  },
  {
    accessorKey: "placeOfBirth",
    header: () => <div className="text-center">Lieu de naissance</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const member = row.original

      return (
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background z-30">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(member.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
  {
    accessorKey: "action",
    header: ()=> <a href="/tree/member" >Create Member</a>,
  },
]

