"use client";

import { useState, useTransition } from "react";
import { Ban, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

import {
  updateAdminUserStatus,
  UserStatus,
} from "../_action/update-user-status";

interface Props {
  userId: string;
  userName: string;
  status: UserStatus;
}

const UpdateUserStatusDialog = ({
  userId,
  userName,
  status,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const isBanned = status === "BANNED";

  const newStatus: UserStatus = isBanned
    ? "ACTIVE"
    : "BANNED";

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateAdminUserStatus(
        userId,
        newStatus
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        isBanned
          ? `${userName} has been unbanned.`
          : `${userName} has been banned.`
      );

      setOpen(false);

      router.refresh();
    });
  };

  return (
    <>
      <Button
        size="sm"
        variant={isBanned ? "outline" : "destructive"}
        onClick={() => setOpen(true)}
      >
        {isBanned ? (
          <>
            <CheckCircle2 className="mr-1.5 h-4 w-4" />
            Unban
          </>
        ) : (
          <>
            <Ban className="mr-1.5 h-4 w-4" />
            Ban
          </>
        )}
      </Button>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isBanned
                ? "Unban this user?"
                : "Ban this user?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to{" "}
              <strong>
                {isBanned ? "unban" : "ban"}
              </strong>{" "}
              <strong>{userName}</strong>?

              <br />

              {isBanned
                ? "This user will regain access to the platform."
                : "This user will lose access to the platform."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={isPending}
              onClick={handleUpdate}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : isBanned ? (
                "Unban User"
              ) : (
                "Ban User"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateUserStatusDialog;