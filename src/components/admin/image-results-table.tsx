"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { deleteImageResult } from "@/app/admin/actions";
import { ImageResultDialog } from "./image-result-dialog";

interface Category {
  id: string;
  name: string;
}

interface ImageResultData {
  id: string;
  title: string;
  description: string | null;
  categoryId: string;
  categoryName: string | null;
  date: Date;
  imageUrl: string;
}

export function ImageResultsTable({
  data,
  categories,
}: {
  data: ImageResultData[];
  categories: Category[];
}) {
  const [editingItem, setEditingItem] = useState<ImageResultData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onEdit = (item: ImageResultData) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const onAdd = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  // ✅ Handle Delete Confirm
  const onDelete = async () => {
    if (!deleteId) return;
    const item = data.find((d) => d.id === deleteId);
    if (!item) return;

    const res = await deleteImageResult(item.id, item.imageUrl);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setDeleteId(null);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          onClick={onAdd}
          className="bg-primary shadow-lg shadow-primary/25"
        >
          + Add New Result
        </Button>
      </div>

      <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  No results found. Click "Add New Result" to start.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="relative h-12 w-20 rounded-md overflow-hidden border bg-muted">
                      <Image
                        src={row.imageUrl}
                        alt={row.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(row.date, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-background/50">
                      {row.categoryName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(row)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* ✅ Trigger Delete Popup */}
                        <DropdownMenuItem
                          onClick={() => setDeleteId(row.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ImageResultDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        categories={categories}
        initialData={editingItem}
      />

      {/* ✅ DELETE CONFIRMATION POPUP */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              result image from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
