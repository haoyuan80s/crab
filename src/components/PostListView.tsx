import { createResource, For } from "solid-js";
import { APP } from "../state";
import { api } from "../rpc";
import { Post } from "../model/Post";
import { unwrapOr } from "../result";
import PostItemView from "./PostItemView";
import { ChannelId } from "../model/ChannelId";

export default function PostListView() {
  // TODO: refetch or mutate if subscribe new post
  createResource(
    () => APP().selectedChannelId(),
    async (channelId: ChannelId) => await APP().fetchPostsV2(channelId),
  );

  return (
    <div class="flex shadow-[0px_-1px_2px_rgba(0,0,0,0.1)] flex-col min-w-[280px] max-w-[320px] h-full overflow-y-scroll no-scrollbar space-y-0 px-1 ">
      <For each={APP().posts()}>{(post) => <PostItemView post={post} />}</For>
    </div>
  );
}
