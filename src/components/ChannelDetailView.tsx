// import { createResource, For } from "solid-js";
// import type { Channel } from "../model/Channel";
// import { unwrapOr } from "../result";
// import { api } from "../rpc";
// import PostItemView from "./PostItemView";

// export function ChannelDetailView(props: { channel: Channel }) {
//   const [posts, { mutate, refetch }] = createResource(
//     () => channel.id,
//     async () => {
//       let posts = unwrapOr(
//         await api<Post[]>({
//           ListPost: { channelId: channelId },
//         }),
//         [],
//       ).sort((a, b) =>
//         a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
//       );
//     },
//   );
//   return (
//     <div class="flex shadow-[0px_-1px_2px_rgba(0,0,0,0.1)] flex-col min-w-[280px] max-w-[320px] h-full overflow-y-scroll no-scrollbar space-y-0 px-1 ">
//       <For each={posts()}>{(post) => <PostItemView post={post} />}</For>
//     </div>
//   );
// }
