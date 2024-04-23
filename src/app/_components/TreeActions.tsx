"use client"
import { useState } from "react"
import { DotsHorizontalIcon, EyeOpenIcon, Pencil1Icon, Share1Icon, TrashIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"

import { UpdateTreeForm } from "./UpdateTreeForm"
import { api } from "~/trpc/react"
import { TreeRefetchHook } from "./TreeRefetchHook"

export interface TreeActionsProps {
  treeInfo: {
    treeId: string
    treeName: string
    treeType: "private" | "public"
  },
}
export default function TreeActions({ treeInfo }: TreeActionsProps) {
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const us = "admin"
  const isAdmin = us === "admin";

  const{ handleRefetch } = TreeRefetchHook()

  const deleteTree = api.tree.delete.useMutation()

  const handleDelete = async () => {
    deleteTree.mutate(
      { id: treeInfo.treeId },
      {
        onSettled: () => {
          handleRefetch()
        }
      }
    )

  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Share1Icon className="mr-2 h-3.5 w-3.5" />
            <p className="text-sm">Partager l&apos;arbre</p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EyeOpenIcon className="mr-2 h-3.5 w-3.5" />
            <p className="text-sm">Visualiser l&apos;arbre</p>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pencil1Icon className="mr-2 h-3.5 w-3.5" />
            <span onClick={() => setDialogIsOpen(true)}>Modifier l&apos;arbre</span>
          </DropdownMenuItem>
           {isAdmin && <DropdownMenuItem className="text-red-600">
              <TrashIcon className="mr-2 h-3.5 w-3.5" />
              <span onClick={() => setAlertDialogIsOpen(true)} >
                  Supprimer l&apos;arbre
              </span>
            </DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={alertDialogIsOpen} onOpenChange={setAlertDialogIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Etes-vous sûr de vouloir supprimer cet arbre? </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne pourra pas etre annulé
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modification de l&apos;arbre</DialogTitle>
            <DialogDescription>
              Remplissez les champ ci-dessous pour modifier cet arbre
            </DialogDescription>
            <UpdateTreeForm treeInfo={treeInfo}  setDialogIsOpen={setDialogIsOpen} />
          </DialogHeader>
        </DialogContent>
    </Dialog>
    </>
  )
}
