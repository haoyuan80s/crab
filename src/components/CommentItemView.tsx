import { createSignal, Show } from "solid-js";
import { dbg } from "../dev";
import { api } from "../rpc";
import { CommentWithActions } from "../model/CommentWithActions";
import { isError, isOk } from "../result";
import { ReactTabName } from "./PostDetailView";

export default function CommentItemView(props: {
  commentWithActions: CommentWithActions;
  activeTab: ReactTabName;
}) {
  const [like, setLike] = createSignal<boolean>(
    props.commentWithActions.actions.includes("Like"),
  );
  const [dislike, setDislike] = createSignal<boolean>(
    props.commentWithActions.actions.includes("Dislike"),
  );
  const [deleteAction, setDeleteAction] = createSignal<boolean>(
    props.commentWithActions.actions.includes("Delete"),
  );
  const initReply = () => {
    const reply = props.commentWithActions.actions.find(
      (a) => typeof a === "object" && "Reply" in a,
    );
    return reply ? reply.Reply : "";
  };
  const [reply, setReply] = createSignal<string>(initReply());
  const [input, setInput] = createSignal<string>(initReply());

  const isActive = () => {
    if (props.activeTab == "AllReact") {
      return true;
    }
    if (props.activeTab == "Reply") {
      return reply() !== "";
    }
    if (props.activeTab == "Like") {
      return like();
    }
    if (props.activeTab == "Dislike") {
      return dislike();
    }
    if (props.activeTab == "Delete") {
      return deleteAction();
    }
    if (props.activeTab == "NoReact") {
      return !like() && !dislike() && !deleteAction() && reply() === "";
    }
  };

  const toggleLike = async () => {
    const a = !like();
    setLike(a);
    dbg("Like clicked:", like());
    const res = await api({
      SetAction: {
        setAction: { Like: a },
        commentId: props.commentWithActions.comment.id,
      },
    });
    if (isError(res)) {
      dbg("Error setting like:", res);
      setLike(!a);
    }
  };
  const toggleDislike = async () => {
    const a = !dislike();
    setDislike(a);
    dbg("Dislike clicked:", dislike());
    const res = await api({
      SetAction: {
        setAction: { Dislike: a },
        commentId: props.commentWithActions.comment.id,
      },
    });
    if (isError(res)) {
      dbg("Error setting dislike:", res);
      setDislike(!a);
    }
  };
  const toggleDelete = async () => {
    const a = !deleteAction();
    setDeleteAction(a);
    dbg("Delete clicked:", deleteAction());
    const res = await api({
      SetAction: {
        setAction: { Delete: a },
        commentId: props.commentWithActions.comment.id,
      },
    });
    if (isError(res)) {
      dbg("Error setting delete:", res);
      setDeleteAction(!a);
    }
  };
  const saveReply = async () => {
    setReply(input());
    const res = await api({
      SetAction: {
        setAction: { Reply: input() },
        commentId: props.commentWithActions.comment.id,
      },
    });
    if (isOk(res)) {
      dbg("Reply saved:", input());
    } else {
      dbg("Error saving reply:", res);
    }
  };
  const deletaeReply = async () => {
    setReply("");
    setInput("");
    const res = await api({
      SetAction: {
        setAction: { Reply: "" },
        commentId: props.commentWithActions.comment.id,
      },
    });
    if (isOk(res)) {
      dbg("Reply deleted");
    } else {
      dbg("Error deleting reply:", res);
    }
  };

  const actionList = (
    <div class="space-y-2">
      <div
        class={`flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded shadow-sm ${
          like() ? "opacity-100" : "opacity-30 hover:opacity-50"
        }`}
        onclick={toggleLike}
      >
        <span>👍</span>
        <span class="font-semibold">Liked</span>
      </div>

      <div
        class={`flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded shadow-sm ${
          dislike() ? "opacity-100" : "opacity-30 hover:opacity-50"
        }`}
        onclick={toggleDislike}
      >
        <span>👎</span>
        <span class="font-semibold">Disliked</span>
      </div>
      <div
        class={`flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-inner ${
          deleteAction() ? "opacity-100" : "opacity-30 hover:opacity-50"
        }`}
        onclick={toggleDelete}
      >
        <span>🗑️</span>
        <span class="italic line-through">Deleted</span>
      </div>
      <div class="flex flex-col gap-2 mt-2">
        <label class="text-sm text-gray-700">Reply Message:</label>
        <input
          type="text"
          class="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
        <div class="flex gap-2">
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
            onClick={saveReply}
          >
            Save Reply
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm"
            onClick={deletaeReply}
          >
            Delete Reply
          </button>
        </div>
      </div>
    </div>
  );

  const commentInfo = (
    <div class="flex items-start space-x-2 text-custom13 pb-2 pt-2.5">
      {/* Author Thumbnail */}
      <img
        src={props.commentWithActions.comment.authorThumbnailUrl}
        alt={props.commentWithActions.comment.authorName}
        class="w-[30px] h-[30px] rounded-full"
        onClick={(e) => e.stopPropagation()}
      ></img>
      <div class="flex flex-col w-full h-full">
        {props.commentWithActions.comment.content}
      </div>
    </div>
  );

  return (
    <Show when={isActive()}>
      <div class="flex-col">
        {actionList}
        {commentInfo}
      </div>
    </Show>
  );
}
