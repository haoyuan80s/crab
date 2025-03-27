import { createResource, createSignal, For, Show } from "solid-js";
import { Post } from "../model/Post";
import { PostId } from "../model/PostId";
import { api } from "../rpc";
import { unwrapOr } from "../result";
import { dbg } from "../dev";
import CommentItemView from "./CommentItemView";
import { CommentWithActions } from "../model/CommentWithActions";

export type ReactTabName =
  | "AllReact"
  | "Reply"
  | "Like"
  | "Dislike"
  | "Delete"
  | "NoReact";

const ALL_TAB_NAMES: ReactTabName[] = [
  "AllReact",
  "Reply",
  "Like",
  "Dislike",
  "Delete",
  "NoReact",
];

const DEFAULT_TAB_NAME = "AllReact";

export default function PostDetailView(prop: { post: Post }) {
  const [comments] = createResource(
    () => prop.post.id,
    async (postId: PostId) => {
      const res = await api<CommentWithActions[]>({
        ListComments: { postId: postId },
      });
      dbg(res);
      return unwrapOr(res, []);
    },
    {
      initialValue: [],
    },
  );
  // const [actionFilter, setActionFilter] = createSignal<null>(null);
  const [activeTab, setActiveTab] =
    createSignal<ReactTabName>(DEFAULT_TAB_NAME);
  const [metadataExpanded, setMetadataExpanded] = createSignal(true);
  // const filtedComment = () => {
  //   const tab = activeTab();
  //   if (tab === "AllReact") {
  //     return comments();
  //   }
  //   return comments().filter((c) =>
  //     c.actions.map((a) => actionName(a)).includes(tab),
  //   );
  // };

  return (
    <div class="relative flex flex-col items-center w-full h-full px-2 py-4 text-black font-figtree leading-tight text-custom14">
      <div class="flex flex-col w-full px-2 pb-2 justify-start items-start space-y-1">
        {/* Post Title */}
        <div class="flex w-full items-start space-x-2">
          <div class="text-custom16 font-semibold">{prop.post.title}</div>
          <button
            class="flex items-center justify-center w-[22px] h-[22px] hover:bg-grey-custom1 rounded-full shrink-0"
            title={`${metadataExpanded() ? "Show less" : "Show more"}`}
            onClick={() => setMetadataExpanded(!metadataExpanded())}
          >
            <img
              src={`${metadataExpanded() ? "/iconUp.svg" : "/iconDown.svg"}`}
              class="w-[15px] h-auto cursor-pointer"
            />
          </button>
        </div>
        {/* Post metadata */}
        <Show when={metadataExpanded()}>
          <PostMetadataView post={prop.post} />
        </Show>
      </div>
      <div class="flex h-fit w-full justify-between px-2 items-center py-2">
        {/* Action Tab Buttons */}
        <div class="flex space-x-2 items-center leading-none">
          <For each={ALL_TAB_NAMES}>
            {(tab) => (
              <button
                class={`flex items-center justify-center border-1 border-grey-custom1 w-[60px] h-[45px] rounded-lg }`}
                onClick={() => {
                  if (tab === activeTab()) {
                    setActiveTab(DEFAULT_TAB_NAME);
                  } else {
                    setActiveTab(tab);
                  }
                }}
              >
                <div
                  class={`flex flex-col py-1 leading-none space-x-0 ${activeTab() === tab ? "opacity-100" : "opacity-30 hover:opacity-50"}`}
                >
                  {/* <div class="font-semibold text-custom13"> */}
                  {/*   {countCommentsByTab(prop.post.id, tab)} */}
                  {/* </div> */}
                  <img
                    src={`/tab${tab}.svg`}
                    class="h-[17px] w-auto cursor-pointer"
                  />
                </div>
              </button>
            )}
          </For>
        </div>
        <div class="flex space-x-1">
          <button
            title="Filter/Sort"
            class="p-2 hover:bg-grey-custom2 w-fit h-fit rounded-full bg-grey-custom1 cursor-pointer"
          >
            <img src="/iconFilter.svg" class="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>
      {/* Comment list */}
      <div class="w-full flex-1 py-1 overflow-y-auto no-scrollbar">
        <div class="flex flex-col">
          <For each={comments()}>
            {(comment) => (
              <CommentItemView
                commentWithActions={comment}
                activeTab={activeTab()}
              />
            )}
          </For>
          <div class="h-[100px]" />
        </div>
      </div>
      {/* Submit Buttons */}
      {/* {countCommentsWithAnyAction(prop.post.id) > 0 && ( */}
      {/*   <SubmitButton postId={prop.post.id} /> */}
      {/* )} */}
    </div>
  );
}

// Show metadata about the post, e.g., summary, cover image, etc.
function PostMetadataView(prop: { post: Post }) {
  return (
    <div class="flex flex-col w-full items-center pb-2">
      <div class="text-custom12 leading-4 pt-2 pb-4">
        {/* TODO: ADD TIME */}
        {/* <span class="font-medium"> */}
        {/*   {getDateString(prop.post.createdAtCommunityTime)}:{" "} */}
        {/* </span>{" "} */}
        {prop.post.summary}
      </div>
      <div class="relative w-full max-w-[300px]">
        <img
          src={prop.post.thumbnailUrl}
          alt={prop.post.title}
          class="w-full h-auto rounded-lg border-1 border-grey-custom1"
        />
        <button class="absolute bottom-2 right-2 cursor-pointer group">
          <div class="w-full h-full relative p-1">
            <img
              title="Go to YouTube"
              src="/iconYouTube.svg"
              class="w-[28px] h-auto"
              onClick={() => {
                console.log("Open URL in new tab: ", prop.post.link);
                window.open(prop.post.link, "_blank");
              }}
            />
            <span class="absolute inset-0 bg-black rounded-lg opacity-0 group-hover:opacity-20"></span>
          </div>
        </button>
      </div>
    </div>
  );
}
