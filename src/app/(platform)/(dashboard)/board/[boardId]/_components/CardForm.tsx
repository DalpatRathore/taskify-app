"use client";

import { createCard } from "@/actions/createCard";
import FormButtton from "@/components/form/FormButtton";
import FormTextarea from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: data => {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
      },
      OnError: error => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;
      // const boardId = formData.get("boardId") as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          action={onSubmit}
          ref={formRef}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          ></FormTextarea>
          <input type="hidden" name="listId" value={listId} id="listId" />
          <div className="flex items-center gap-x-1">
            <FormButtton> Add card</FormButtton>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5"></X>
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <Plus className="w-4 h- mr-2"></Plus>
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
export default CardForm;
