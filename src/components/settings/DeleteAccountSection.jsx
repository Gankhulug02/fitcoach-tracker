import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";

export default function DeleteAccountSection() {
  const { signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (confirm !== "DELETE") return;
    setDeleting(true);
    const { error } = await supabase.rpc("delete_user");
    if (error) {
      toast.error("Deletion failed. Please try again.");
      setDeleting(false);
      return;
    }
    await signOut();
  }

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)} className="w-full">
        Delete my account
      </Button>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Delete Account">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-zinc-400">
            This will permanently delete all your data — workouts, runs, body stats, and your account. This cannot be undone.
          </p>
          <Input
            label='Type "DELETE" to confirm'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="DELETE"
          />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={confirm !== "DELETE" || deleting} className="flex-1">
              {deleting ? "Deleting…" : "Delete everything"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
