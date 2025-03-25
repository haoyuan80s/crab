import { For, Setter, Suspense } from "solid-js";
import { Channel } from "../model/Channel";
import { ChannelId } from "../model/ChannelId";
import { dbg } from "../dev";
import ChannelIconView from "./ChannelIconView";

export default function ChannelListView(props: {
  channels: Channel[];
  selectedChannelId: ChannelId;
  setSelectedChannelId: Setter<ChannelId>;
}) {
  return (
    <div class="flex flex-col w-[64px] shrink-0 h-full bg-white items-center justify-start px-1 py-4">
      <div class="flex flex-col h-full items-center justify-start overflow-y-scroll no-scrollbar space-y-1">
        {/* TODO: suspense view */}
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
      </div>
    </div>
  );
}
