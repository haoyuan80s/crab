import { createSignal } from "solid-js";
import { dbg } from "../dev";
import { api } from "../rpc";
import { isOk } from "../result";

export default function Dev() {
  const [subscribeText, setSubscribeText] = createSignal("");
  const [unsubscribeText, setUnsubscribeText] = createSignal("");

  const handleSubscribe = async (e: Event) => {
    e.preventDefault();
    const res = await api({ SubscribePost: { postId: subscribeText() } });
    if (isOk(res)) {
      console.log("Subscription successful:", res.value);
    } else {
      console.error("Subscription failed:", res.error);
    }
  };

  const handleUnsubscribe = async (e: Event) => {
    e.preventDefault();
    const res = await api({ UnsubscribePost: { postId: unsubscribeText() } });
    if (isOk(res)) {
      console.log("Unsubscription successful:", res.value);
    } else {
      console.error("Unsubscription failed:", res.error);
    }
  };

  return (
    <div>
      <button>Dev</button>

      <form onSubmit={handleSubscribe}>
        <input
          type="text"
          value={subscribeText()}
          onInput={(e) => setSubscribeText(e.currentTarget.value)}
          placeholder="Video Id..."
          class="border p-1 m-2"
        />
        <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded">
          Subscribe
        </button>
      </form>

      <form onSubmit={handleUnsubscribe}>
        <input
          type="text"
          value={unsubscribeText()}
          onInput={(e) => setUnsubscribeText(e.currentTarget.value)}
          placeholder="Video Id..."
          class="border p-1 m-2"
        />
        <button type="submit" class="bg-red-500 text-white px-3 py-1 rounded">
          Unsubscribe
        </button>
      </form>
    </div>
  );
}
