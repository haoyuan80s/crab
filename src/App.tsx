import {
  createEffect,
  createResource,
  onMount,
  Show,
  Suspense,
} from "solid-js";
import "./App.css";
import * as rpc from "./rpc";
import { UserState } from "./model/UserState";
import ChannelView from "./components/ChannelListView";
import PostListView from "./components/PostListView";
import PostDetailView from "./components/PostDetailView";
import { createStore } from "solid-js/store";
import Dev from "./components/DevView";
import { APP_INITIALIZED, AppState } from "./state";
import { dbg } from "./dev";
import { unwrap, unwrapOr } from "./result";
import { Channel } from "./model/Channel";
import { KeyObject } from "crypto";

export default function App() {
  const [state] = createResource(async () => {
    let res = await rpc.api<UserState>("GetUserState");
    return unwrap(res);
  });

  return (
    <Suspense fallback={<LoadingView />}>
      <MainView userState={state()} />
    </Suspense>
  );
}

function MainView(props: { userState: UserState }) {
  const [channels] = createResource(
    () => props.userState,
    async () => {
      let channels_ = await rpc.api<Channel[]>("ListChannels");
      let channels = unwrapOr(channels_, []).sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
      return channels;
    },
    {
      initialValue: [],
    },
  );

  return (
    <div class="flex-col">
      <div class="flex min-h-screen bg-gray-50 text-gray-800">
        <div class="w-60 bg-white border-r border-gray-200 p-4">
          <h2 class="text-lg font-semibold mb-4">Left Panel</h2>
        </div>

        <div class="w-64 bg-white border-r border-gray-200 p-4">
          <h2 class="text-lg font-semibold mb-4">ChannelView</h2>
          <Suspense>
            <ChannelView channels={channels()} />
          </Suspense>
        </div>

        {/* <div class="flex-1 p-4"> */}
        {/*   <h2 class="text-lg font-semibold mb-4">Posts</h2> */}
        {/*   <PostListView /> */}
        {/* </div> */}

        {/* <Show when={APP().selectedPostId}> */}
        {/*   <div class="flex-1 p-4"> */}
        {/*     <h2 class="text-lg font-semibold mb-4">Post Detail</h2> */}
        {/*     <PostDetailView /> */}
        {/*   </div> */}
        {/* </Show> */}
      </div>

      <div class="flex-1 p-4">
        <h2 class="text-lg font-semibold mb-4">Dev</h2>
        <Dev />
      </div>
    </div>
  );
}

function LoadingView() {
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div class="text-lg font-semibold">Loading...</div>
    </div>
  );
}
