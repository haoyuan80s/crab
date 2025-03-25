import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import { api } from "../rpc";
import type { Channel } from "../model/Channel";
import { unwrapOr } from "../result";
import { ChannelId } from "../model/ChannelId";
import PostItemView from "./PostItemView";
import { Post } from "../model/Post";
import { PostId } from "../model/PostId";
import PostListView from "./PostListView";
import PostDetailView from "./PostDetailView";

export default function ChannelDetailView(props: { channel: Channel }) {
  const [selectedPostId, setSelectedPostId] = createSignal<PostId | null>(null);
  const [posts, { mutate, refetch }] = createResource(
    () => props.channel.id,
    async (channelId: ChannelId) => {
      let posts = unwrapOr(
        await api<Post[]>({
          ListPost: { channelId: channelId },
        }),
        [],
      ).sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      return posts;
    },
    {
      initialValue: [],
    },
  );
  const selectedPost = () => {
    if (!selectedPostId()) return null;
    return posts()?.find((p) => p.id === selectedPostId());
  };

  return (
    <div class="flex">
      <PostListView
        posts={posts()}
        selectedPostId={selectedPostId()}
        setSelectedPostId={setSelectedPostId}
      />
      <Show when={selectedPost()}>
        <PostDetailView post={selectedPost()} />
      </Show>
    </div>
  );
}
