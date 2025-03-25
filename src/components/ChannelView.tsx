import { createSignal, Show } from "solid-js";
import type { Channel } from "../model/Channel";
import { ChannelId } from "../model/ChannelId";
import ChannelListView from "./ChannelListView";
import ChannelDetailView from "./ChannelDetailView";

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
