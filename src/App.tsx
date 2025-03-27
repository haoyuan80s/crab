import { createResource } from "solid-js";
import "./App.css";
import * as rpc from "./rpc";
import { UserState } from "./model/UserState";
import ChannelView from "./components/ChannelView";
import Dev from "./components/DevView";
import { unwrap, unwrapOr } from "./result";
import { Channel } from "./model/Channel";

export default function App() {
  const [state] = createResource(async () => {
    let res = await rpc.api<UserState>("GetUserState");
    return unwrap(res);
  });
  return <MainView userState={state()} />;
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
          <ChannelView channels={channels()} />
        </div>
      </div>

      <div class="flex-1 p-4">
        <h2 class="text-lg font-semibold mb-4">Dev</h2>
        <Dev />
      </div>
    </div>
  );
}
