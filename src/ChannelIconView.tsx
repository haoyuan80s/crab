import { APP } from "../state";
import { Channel } from "./model/Channel";

export default function ChannelIconView(prop: {
  channel: Channel;
  selected: boolean;
}) {
  return (
    <div class="flex flex-col items-center rounded-md hover:bg-grey-custom1 py-1 space-y-1 leading-none w-full cursor-pointer">
      <div class="px-2 w-full">
        <img
          src={prop.channel.thumbnailUrl}
          alt={prop.channel.title}
          class={`w-[38px] h-[38px] rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.2)] ${prop.selected ? "outline-2 outline-crab-green" : ""}`}
        />
      </div>
      <p
        class={`text-custom10 leading-none line-clamp-1 text-center px-0.5 ${prop.selected ? "text-crab-green" : "text-grey-channel-text"}`}
      >
        {prop.channel.title}
      </p>
    </div>
  );
}
