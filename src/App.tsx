import { createEffect, createSignal, For } from "solid-js";
import "./App.css";
import { ChannelInfo, PostInfo } from "./model";
import { channelResource, postsResource, commentsStore, setRepliesStore, timeAgo } from "./global";
import PostDetailView from "./components/PostDetailView";


function get1stPostInChannel(postList: PostInfo[], channelId: string) {
  return postList.filter(post => post.channelId === channelId)[0]?.id
}


export default function App() {
  const channels = () => channelResource() || [];
  const posts = () => postsResource() || [];

  const [currentChannelId, setCurrentChannelId] = createSignal(channels()[0]?.id || "");
  const [currentPostId, setCurrentPostId] = createSignal("");

  // Initialize currentPostId when channels and posts are loaded
  createEffect(() => {
    const loadedChannels = channels();
    const loadedPosts = posts();
    if (loadedChannels.length > 0 && loadedPosts.length > 0) {
      const firstChannelId = loadedChannels[0].id;
      setCurrentChannelId(firstChannelId);
      const firstPostId = get1stPostInChannel(loadedPosts, firstChannelId);
      if (firstPostId) {
        setCurrentPostId(firstPostId);
      }
    }
  });

  const filteredPosts = () => posts().filter(post => post.channelId === currentChannelId());
  const currentPost = () => posts().find(post => post.id === currentPostId());

  // Button Tracked for Channels
  function ChannelButton(prop: { postgrp: ChannelInfo }) {
    return (
      <div
        class="flex flex-col items-center rounded-md hover:bg-grey-custom1 py-1 space-y-1 leading-none w-full cursor-pointer"
        onclick={() => {
          setCurrentChannelId(prop.postgrp.id);
          const firstPostId = get1stPostInChannel(posts(), prop.postgrp.id);
          if (firstPostId) {
            setCurrentPostId(firstPostId);
          }
        }}
      >
        <div class="px-2 w-full">
          <img
            src={prop.postgrp.thumbnailUrl}
            alt={prop.postgrp.title}
            class={`w-[38px] h-[38px] rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.2)] ${currentChannelId() == prop.postgrp.id ? "outline-2 outline-crab-green" : ""}`}
          />
        </div>
        <p class={`text-custom10 leading-none line-clamp-1 text-center px-0.5 ${currentChannelId() == prop.postgrp.id ? "text-crab-green" : "text-grey-channel-text"}`}>{prop.postgrp.title}</p>
      </div>
    )
  }

  // Button for Adding a New Channel
  function AddChannelButton() {
    return (
      <div
        class="flex flex-col items-center rounded-md py-2 space-y-1 leading-none w-full cursor-pointer text-grey-channel-text"
      >
        <div class="px-2 w-full h-full">
          <div
            class="flex w-[38px] h-[38px] rounded-full justify-center items-center hover:bg-grey-custom1 text-xl font-light shadow-[0px_2px_4px_rgba(0,0,0,0.2)]"
          > + </div>
        </div>
      </div>
    )
  }

  function ChannelListItem(prop: { post: PostInfo }) {
    return (
      <div
        class={`px-2.5 rounded-md cursor-pointer ${currentPostId() == prop.post.id ? "bg-crab-green" : "hover:bg-grey-custom1"}`}
        onclick={() => setCurrentPostId(prop.post.id)}
      >
        <div
          class={`border-b text-white ${currentPostId() == prop.post.id ? "border-crab-green" : "border-grey-custom1"}`}
        >
          <div class="flex items-center space-x-3 py-2.5">
            <img
              src={prop.post.thumbnailUrl}
              alt={prop.post.title}
              class="w-[42px] h-[42px] rounded-md object-cover"
            />
            <div class="flex flex-col leading-tight h-full ">
              <div class={`text-custom14 line-clamp-1 ${currentPostId() == prop.post.id ? "text-white" : "text-black"}`}>{prop.post.title}</div>
              <div class="flex pt-1">
                <div class={`text-custom11 leading-none font-light ${currentPostId() == prop.post.id ? "text-white" : "text-gray-400"}`}>Released {timeAgo(prop.post.createdAtCommunityTime)}</div>
                <div class={`text-custom11 leading-none font-light ${currentPostId() == prop.post.id ? "text-white" : "text-gray-400"} px-0.5`}>⋅</div>
                <div class={`text-custom11 leading-none font-light ${currentPostId() == prop.post.id ? "text-white" : "text-crab-orange"}`}> Tracked {timeAgo(prop.post.lastTrackedTime)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div class="flex h-screen relative font-figtree">
      {/* Channel Carousel */}
      <div class="flex flex-col w-[64px] shrink-0 h-full bg-white items-center justify-start px-1 py-4">
        <div class="flex flex-col h-full items-center justify-start overflow-y-scroll no-scrollbar space-y-1">
          <For each={channels()}>
            {(postgrp) => (<ChannelButton postgrp={postgrp} />)}
          </For>
        </div>
        <div class="bottom-100"> <AddChannelButton /> </div>
      </div>

      {/* Post List for Selected Channel */}
      <div class="flex shadow-[0px_-1px_2px_rgba(0,0,0,0.1)] flex-col min-w-[280px] max-w-[320px] h-full overflow-y-scroll no-scrollbar space-y-0 px-1 ">
        <For each={filteredPosts()}>
          {(post) => (<ChannelListItem post={post} />)}
        </For>
      </div>

      {/* Post Comments View */}
      <div class="flex-1">
        {currentPost() && <PostDetailView post={currentPost()!} />}
      </div>
    </div>
  );
}