"use client";

import { useState } from "react";
import {
  Trash2,
  Plus,
  Loader2,
  Search,
  Tag,
  CalendarDays,
  MoreHorizontal,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Motion

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/app/admin/actions";

type Category = {
  id: string;
  name: string;
  createdAt: Date;
};

export function CategoryList({ initialData }: { initialData: Category[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredData = initialData.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddDialog = () => {
    setEditingId(null);
    setCategoryName("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (cat: Category) => {
    setEditingId(cat.id);
    setCategoryName(cat.name);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    setIsLoading(true);

    let res;
    if (editingId) {
      res = await updateCategory(editingId, categoryName);
    } else {
      res = await createCategory(categoryName);
    }

    setIsLoading(false);
    if (res.success) {
      toast.success(res.message);
      setIsDialogOpen(false);
      setCategoryName("");
      setEditingId(null);
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteCategory(deleteId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-8">
      {/* Search & Add Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/50 backdrop-blur-md p-4 rounded-xl border shadow-sm"
      >
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9 bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button
          onClick={openAddDialog}
          className="w-full sm:w-auto bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </motion.div>

      {/* Grid with Animation */}
      <motion.div
        layout // Smooth layout changes when filtering
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl border-muted bg-muted/10"
            >
              <div className="p-4 bg-muted rounded-full mb-3">
                <Tag className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium">No categories found.</p>
            </motion.div>
          ) : (
            filteredData.map((cat) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={cat.id}
                className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-card to-card/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50"
              >
                <Tag className="absolute -right-4 -bottom-4 h-24 w-24 text-primary/5 group-hover:text-primary/10 transition-colors rotate-12 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary mb-3 w-fit">
                        <Tag className="h-5 w-5" />
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 -mr-2 text-muted-foreground hover:text-foreground"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditDialog(cat)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteId(cat.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <CalendarDays className="h-3 w-3" />
                    Created {format(new Date(cat.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Category" : "Create Category"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the category name."
                : "Add a new category label."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="e.g. 11:20 AM Result"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="text-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingId ? "Save Changes" : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION POPUP */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
