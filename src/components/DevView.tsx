import { createSignal } from "solid-js";
import { dbg } from "../dev";
import { api } from "../rpc";
import { isOk } from "../result";

export default function Dev() {
  const [text, setText] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    dbg("Submitted text:", text());
    const res = await api({ SubscribePost: { postId: text() } });
    if (isOk(res)) {
      console.log("Subscription successful:", res.value);
    } else {
      console.error("Subscription failed:", res.error);
    }
  };

  return (
    <div>
      <button>Dev</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text()}
          onInput={(e) => setText(e.currentTarget.value)}
          placeholder="Type something..."
          class="border p-1 m-2"
        />
        <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
