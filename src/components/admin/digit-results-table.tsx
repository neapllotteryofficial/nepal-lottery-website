"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Edit, Trash2, Plus, Calendar } from "lucide-react";
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

import { deleteDigitResult } from "@/app/admin/actions";
import { DigitResultDialog } from "./digit-result-dialog";

interface DigitResultData {
  id: string;
  resultDate: string;
  morningDigit: number | null;
  dayDigit: number | null;
  eveningDigit: number | null;
}

export function DigitResultsTable({ data }: { data: DigitResultData[] }) {
  const [editingItem, setEditingItem] = useState<DigitResultData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onAdd = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const onEdit = (item: DigitResultData) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  // ✅ Handle Delete Confirm
  const onDelete = async () => {
    if (!deleteId) return;
    const res = await deleteDigitResult(deleteId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setDeleteId(null);
  };

  const DigitBadge = ({ val }: { val: number | null }) => {
    if (val === null)
      return (
        <span className="text-muted-foreground/30 font-mono text-xl">-</span>
      );
    return (
      <Badge
        variant="secondary"
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-mono font-bold bg-primary/10 text-primary border border-primary/20 shadow-sm transition-transform hover:scale-110"
      >
        {val}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Recent Entries</h3>
          <p className="text-sm text-muted-foreground">
            Manage your daily lucky digits history.
          </p>
        </div>
        <Button
          onClick={onAdd}
          className="bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Entry
        </Button>
      </div>

      <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[25%] min-w-[180px] pl-6 h-12">
                Date
              </TableHead>
              <TableHead className="text-center h-12">Morning</TableHead>
              <TableHead className="text-center h-12">Day</TableHead>
              <TableHead className="text-center h-12">Evening</TableHead>
              <TableHead className="text-right w-[100px] pr-6 h-12">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-40 text-center text-muted-foreground"
                >
                  No digit results found. Start by adding one.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-600 shrink-0">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground/90 font-semibold">
                          {format(new Date(row.resultDate), "MMMM do, yyyy")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(row.resultDate), "EEEE")}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex justify-center">
                      <DigitBadge val={row.morningDigit} />
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex justify-center">
                      <DigitBadge val={row.dayDigit} />
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex justify-center">
                      <DigitBadge val={row.eveningDigit} />
                    </div>
                  </TableCell>

                  <TableCell className="text-right pr-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(row)}
                        className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {/* ✅ Trigger Delete Popup */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(row.id)}
                        className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DigitResultDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
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
              This will permanently remove the digit results for this date.
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
