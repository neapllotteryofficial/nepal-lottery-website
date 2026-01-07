"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Trash2, Eye, Mail, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { deleteMessage, markMessageAsRead } from "@/app/admin/actions";

interface MessageData {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string | null;
  createdAt: Date;
}

export function MessageList({
  initialMessages,
}: {
  initialMessages: MessageData[];
}) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(
    null
  );
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleView = (msg: MessageData) => {
    setSelectedMessage(msg);
    setIsViewOpen(true);
  };

  const handleMarkAsRead = async (id: string) => {
    const res = await markMessageAsRead(id);
    if (res.success) {
      toast.success(res.message);
      if (isViewOpen) setIsViewOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteMessage(deleteId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setDeleteId(null);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {initialMessages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl border-muted bg-muted/5"
            >
              <div className="p-4 bg-muted rounded-full mb-4">
                <Mail className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold">No messages yet</h3>
              <p className="text-muted-foreground mt-1">
                Your inbox is completely empty.
              </p>
            </motion.div>
          ) : (
            initialMessages.map((msg) => {
              const isUnread = msg.status === "unread";

              return (
                <motion.div key={msg.id} variants={itemVariants} layout>
                  <Card
                    className={cn(
                      "group relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl border-muted-foreground/15 h-full",
                      isUnread
                        ? "bg-card border-l-4 border-l-primary shadow-md"
                        : "bg-card/40 opacity-80 hover:opacity-100"
                    )}
                  >
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 pt-5">
                      <div className="flex items-center gap-3">
                        <Avatar
                          className={cn(
                            "h-10 w-10 border",
                            isUnread ? "border-primary/20" : "border-border"
                          )}
                        >
                          <AvatarFallback
                            className={
                              isUnread
                                ? "bg-primary/10 text-primary font-bold"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {msg.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-sm leading-none line-clamp-1">
                            {msg.name}
                          </h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 line-clamp-1">
                            {msg.email}
                          </p>
                        </div>
                      </div>

                      {isUnread && (
                        <Badge
                          variant="default"
                          className="text-[10px] h-5 px-2 bg-primary text-primary-foreground shadow-sm"
                        >
                          New
                        </Badge>
                      )}
                    </CardHeader>

                    <CardContent className="py-3">
                      <div className="bg-muted/20 p-3 rounded-lg border border-border/40">
                        <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(
                          new Date(msg.createdAt),
                          "MMM d, yyyy • h:mm a"
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0 flex gap-2 pb-4">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-primary/90 hover:bg-primary shadow-sm"
                        onClick={() => handleView(msg)}
                      >
                        <Eye className="mr-2 h-3.5 w-3.5" /> View Message
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => setDeleteId(msg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* VIEW MESSAGE DIALOG */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px] gap-0 p-0 overflow-hidden border-none shadow-2xl">
          {selectedMessage && (
            <>
              <div className="bg-primary px-6 py-8 text-primary-foreground">
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  Message Details
                </DialogTitle>
                <DialogDescription className="text-primary-foreground/80 mt-1">
                  Sent on{" "}
                  {format(new Date(selectedMessage.createdAt), "PPP 'at' p")}
                </DialogDescription>
              </div>

              <div className="p-6 space-y-6 bg-background">
                {/* Sender Info */}
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                      {selectedMessage.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base">
                      {selectedMessage.name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="hover:underline hover:text-primary transition-colors truncate"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Full Message Body */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Message Content
                  </h4>
                  <div className="min-h-[150px] max-h-[300px] overflow-y-auto p-4 rounded-xl bg-muted/20 border text-sm leading-7 text-foreground/90 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>

              <DialogFooter className="p-6 pt-2 bg-background flex sm:justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  {selectedMessage.status === "unread" ? (
                    <span className="flex items-center text-xs text-orange-500 font-medium bg-orange-500/10 px-2 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse" />
                      Unread
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-green-600 font-medium bg-green-600/10 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Read
                    </span>
                  )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewOpen(false)}
                  >
                    Close
                  </Button>
                  {selectedMessage.status === "unread" && (
                    <Button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Read
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION POPUP */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this message from your inbox. This
              action cannot be undone.
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
    </>
  );
}
