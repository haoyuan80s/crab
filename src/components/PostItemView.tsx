import { createResource } from "solid-js";
// import { APP } from "../state";
import { api } from "../rpc";
import { Post } from "../model/Post";
import { unwrapOr } from "../result";
import { dbg } from "../dev";
import { timeAgo } from "../utils";

export default function PostItemView(prop: { post: Post; selected: boolean }) {
  return (
    <div
      class={`px-2.5 rounded-md cursor-pointer ${prop.selected ? "bg-crab-green" : "hover:bg-grey-custom1"}`}
    >
      <div
        class={`border-b text-white ${prop.selected ? "border-crab-green" : "border-grey-custom1"}`}
      >
        <div class="flex items-center space-x-3 py-2.5">
          <img
            src={prop.post.thumbnailUrl}
            alt={prop.post.title}
            class="w-[42px] h-[42px] rounded-md object-cover"
          />
          <div class="flex flex-col leading-tight h-full ">
            <div
              class={`text-custom14 line-clamp-1 ${prop.selected ? "text-white" : "text-black"}`}
            >
              {prop.post.title}
            </div>
            {/* TODO: add timeAgo */}
            {/* <div class="flex pt-1"> */}
            {/*   <div */}
            {/*     class={`text-custom11 leading-none font-light ${APP().selectedPostId() == prop.post.id ? "text-white" : "text-gray-400"}`} */}
            {/*   > */}
            {/*     Released {timeAgo(prop.post.createdAtCommunityTime)} */}
            {/*   </div> */}
            {/*   <div */}
            {/*     class={`text-custom11 leading-none font-light ${APP().selectedPostId() == prop.post.id ? "text-white" : "text-gray-400"} px-0.5`} */}
            {/*   > */}
            {/*     ⋅ */}
            {/*   </div> */}
            {/*   <div */}
            {/*     class={`text-custom11 leading-none font-light ${APP().selectedPostId() == prop.post.id ? "text-white" : "text-crab-orange"}`} */}
            {/*   > */}
            {/*     {" "} */}
            {/*     Tracked {timeAgo(prop.post.lastCrawledTime)} */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
