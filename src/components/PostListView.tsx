import { For, Setter } from "solid-js";
import { api } from "../rpc";
import { Post } from "../model/Post";
import PostItemView from "./PostItemView";
import { PostId } from "../model/PostId";

export default function PostListView(props: {
  posts: Post[];
  selectedPostId: PostId;
  setSelectedPostId: Setter<PostId>;
}) {
  return (
    <div class="flex shadow-[0px_-1px_2px_rgba(0,0,0,0.1)] flex-col min-w-[280px] max-w-[320px] h-full overflow-y-scroll no-scrollbar space-y-0 px-1 ">
      <For each={props.posts}>
        {(post) => (
          <div
            onclick={() => {
              props.setSelectedPostId(post.id);
            }}
          >
            <PostItemView
              post={post}
              selected={post.id === props.selectedPostId}
            />
          </div>
        )}
      </For>
    </div>
  );
}
