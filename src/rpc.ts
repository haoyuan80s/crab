import { ApiMethod } from "./model/ApiMethod";
import { BACKEND_URL } from "./config";
import { TOKEN } from "./state";
import { AuthMethod } from "./model/AuthMethod";
import { Result, unwrap } from "./result";

export async function api<T>(method: ApiMethod): Promise<Result<T>> {
  try {
    const response = await fetch(`${BACKEND_URL}/api`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(method),
    });

    if (!response.ok) {
      throw new Error(
        `API error -- status: ${response.statusText}, message: ${await response.text()}`,
      );
    }

    const json = await response.json();
    const value = json as T;
    return { ok: true, value };
  } catch (error) {
    return {
      ok: false,
      error: `Error parsing JSON response: ${error}`,
    };
  }
}

export async function auth<T>(method: AuthMethod): Promise<Result<T>> {
  try {
    const response = await fetch(`${BACKEND_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(method),
    });

    if (!response.ok) {
      throw new Error(
        `AUTH error -- status: ${response.statusText}, message: ${await response.text()}`,
      );
    }

    const json = await response.json();
    const value = json as T;
    return { ok: true, value };
  } catch (error) {
    return {
      ok: false,
      error: `Error parsing JSON response: ${error}`,
    };
  }
}

export async function health_check() {
  try {
    const response = await fetch(`${BACKEND_URL}/health_check`, {
      method: "GET",
    });
    console.log(response.status); // e.g. 200
    console.log(response.statusText); // e.g. "OK"
  } catch (error) {
    console.error("health_check error:", error);
  }
}

export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0);
}

//#region test

if (import.meta.vitest) {
  test("add works", async () => {
    const c: number = unwrap(await api({ Add: { a: 1, b: 2 } }));
    expect(c).toBe(3);
  });

  // test("get user state works", async () => {
  //   await auth({
  //     CreateDevUser: { is_fresh: false },
  //   });
  //   const userState: UserState = await api("GetUserState");
  //   expect({
  //     userId: userState.id,
  //     userName: userState.name,
  //   }).toMatchSnapshot();
  // });

  // test("subscribe post works", async () => {
  //   await auth({
  //     CreateDevUser: { is_fresh: true },
  //   });
  //   await api({ SubscribePost: { post_id: DEV.postId } });
  //   const newUserState: UserState = await api("GetUserState");
  //   expect(newUserState.posts).toContain(DEV.channelId);
  // });
}

//#endregion test
