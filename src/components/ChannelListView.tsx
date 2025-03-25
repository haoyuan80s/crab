import {
  createResource,
  createSignal,
  For,
  Setter,
  Show,
  Suspense,
} from "solid-js";
import { api } from "../rpc";
import type { Channel } from "../model/Channel";
import { unwrapOr } from "../result";
import { dbg } from "../dev";
import { ChannelId } from "../model/ChannelId";
import PostItemView from "./PostItemView";
import { Post } from "../model/Post";
import ChannelIconView from "../ChannelIconView";
import { PostId } from "../model/PostId";

export default function ChannelView(props: { channels: Channel[] }) {
  const [selectedChannelId, setSelectedChannelId] =
    createSignal<ChannelId | null>(null);
  const channel = () => {
    return props.channels.find((c) => c.id === selectedChannelId());
  };

  return (
    <div class="flex-col">
      <div class="flex min-h-screen bg-gray-50 text-gray-800">
        <div class="w-64 bg-white border-r border-gray-200 p-4">
          <h2 class="text-lg font-semibold mb-4">Channels</h2>
          <ChannelListView
            channels={props.channels}
            selectedChannelId={selectedChannelId()}
            setSelectedChannelId={setSelectedChannelId}
          />
        </div>

        <Show when={channel()}>
          <div class="flex-1 p-4">
            <h2 class="text-lg font-semibold mb-4">Channel Detail</h2>
            <ChannelDetailView channel={channel()} />
          </div>
        </Show>
      </div>
    </div>
  );
}

function ChannelListView(props: {
  channels: Channel[];
  selectedChannelId: ChannelId;
  setSelectedChannelId: Setter<ChannelId>;
}) {
  return (
    <div class="flex flex-col w-[64px] shrink-0 h-full bg-white items-center justify-start px-1 py-4">
      <div class="flex flex-col h-full items-center justify-start overflow-y-scroll no-scrollbar space-y-1">
        {/* TODO: suspense view */}
        <Suspense fallback={<p class="text-gray-500">Loading channels...</p>}>
          <For each={props.channels}>
            {(channel) => (
              <div
                onclick={() => {
                  dbg("Channel clicked:", channel);
                  props.setSelectedChannelId(channel.id);
                }}
              >
                <ChannelIconView
                  channel={channel}
                  selected={channel.id === props.selectedChannelId}
                />
              </div>
            )}
          </For>
        </Suspense>
      </div>
    </div>
  );
}

function ChannelDetailView(props: { channel: Channel }) {
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
  return (
    <Suspense>
      <div class="flex shadow-[0px_-1px_2px_rgba(0,0,0,0.1)] flex-col min-w-[280px] max-w-[320px] h-full overflow-y-scroll no-scrollbar space-y-0 px-1 ">
        <For each={posts()}>
          {(post) => (
            <div
              onclick={() => {
                setSelectedPostId(post.id);
              }}
            >
              <PostItemView
                post={post}
                selected={post.id === selectedPostId()}
              />
            </div>
          )}
        </For>
      </div>
    </Suspense>
  );
}
