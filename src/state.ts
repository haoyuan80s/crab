import { Accessor, createSignal, Setter } from "solid-js";
import { UserState } from "./model/UserState";

import * as rpc from "./rpc";
import { UserId } from "./model/UserId";
import { PostId } from "./model/PostId";
import { ChannelId } from "./model/ChannelId";
import { Comment } from "./model/Comment";
import { createStore, SetStoreFunction } from "solid-js/store";
import { dbg } from "./dev";
import { isError, unwrapOr } from "./result";
import { Channel } from "./model/Channel";
import { Post } from "./model/Post";

export const [TOKEN, SET_TOKEN] = createSignal<string>("7788");
export const [APP_INITIALIZED, SET_APP_INITIALIZED] =
  createSignal<boolean>(false);

export class AppState {
  userId: UserId = null;
  subscriptions: { [key in ChannelId]?: Array<PostId> } = {};
  setSubscriptions: SetStoreFunction<{ [x: string]: string[] }>;

  // selectedChannelId: Accessor<ChannelId | null>;
  // setSelectedChannelId: Setter<ChannelId | null>;

  // selectedPostId: Accessor<PostId | null>;
  // setSelectedPostId: Setter<PostId | null>;

  // channels: Accessor<Channel[]>;
  // setChannels: Setter<Channel[]>;

  // posts: Accessor<Post[]>;
  // setPosts: Setter<Post[]>;

  // comments: Accessor<Comment[]>;
  // setComments: Setter<Comment[]>;

  private static instance: AppState;
  private constructor() {}

  static async init() {
    var instance = new AppState();
    let res = await rpc.api<UserState>("GetUserState");
    if (isError(res)) {
      console.error("Error fetching user state:", res.error);
      return;
    }
    let state = res.value;
    instance.userId = state.id;
    const [subscriptions, setSubscriptions] = createStore<{
      [key in ChannelId]?: Array<PostId>;
    }>(state.subscriptions);
    instance.subscriptions = subscriptions;
    instance.setSubscriptions = setSubscriptions;
    // const [channelId, setChannelId] = createSignal<ChannelId | null>(null);
    // instance.selectedChannelId = channelId;
    // instance.setSelectedChannelId = setChannelId;
    // const [postId, setPostId] = createSignal<PostId | null>(null);
    // instance.selectedPostId = postId;
    // instance.setSelectedPostId = setPostId;
    // const [channels, setChannels] = createSignal<Channel[]>([]);
    // instance.channels = channels;
    // instance.setChannels = setChannels;
    // const [posts, setPosts] = createSignal<Post[]>([]);
    // instance.posts = posts;
    // instance.setPosts = setPosts;
    // const [comments, setComments] = createSignal<Comment[]>([]);
    // instance.comments = comments;
    // instance.setComments = setComments;
    AppState.instance = instance;
    dbg!("GlobalState initialized");
    SET_APP_INITIALIZED(true);
  }

  public static shared(): AppState {
    if (!AppState.instance) {
      AppState.init();
    }
    return AppState.instance;
  }

  public channelIds(): ChannelId[] {
    return Object.keys(this.subscriptions).sort();
  }

  public postIds(channelId: ChannelId): PostId[] {
    return this.subscriptions[channelId].sort();
  }

  public async subscribe(postId: PostId) {
    try {
      await rpc.api({ SubscribePost: { postId: postId } });
    } catch (error) {
      console.error("Error subscribing to post:", error);
    }
  }

  public reset() {
    this.userId = null;
    this.subscriptions = {};
    this.setSubscriptions = null;
  }

  // public selectedPostIds(): PostId[] {
  //   const channelId = this.selectedChannelId();
  //   if (channelId) {
  //     return this.postIds(channelId);
  //   }
  //   return [];
  // }

  public async fetchChannels(): Promise<Channel[]> {
    let channels_ = await rpc.api<Channel[]>("ListChannels");
    let channels = unwrapOr(channels_, []).sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
    // this.setChannels(channels);
    return channels;
  }

  public async fetchPostsV2(channelId: ChannelId) {
    let posts = unwrapOr(
      await rpc.api<Post[]>({
        ListPost: { channelId: channelId },
      }),
      [],
    ).sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
    // this.setPosts(posts);
  }

  public async fetchPosts(channelId: ChannelId): Promise<Post[]> {
    let posts = unwrapOr(
      await rpc.api<Post[]>({
        ListPost: { channelId: channelId },
      }),
      [],
    ).sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
    // this.setPosts(posts);
    return posts;
  }

  // public selectedPost(): Post | null {
  //   const postId = this.selectedPostId();
  //   if (postId) {
  //     return this.posts().find((post) => post.id === postId);
  //   }
  //   return null;
  // }

  // public selectedChannel(): Channel | null {
  //   const channelId = this.selectedChannelId();
  //   if (channelId) {
  //     return this.channelIds().find((channel) => channel.id === channelId);
  //   }
  //   return null;
  // }

  public async fetchComments(postId: PostId): Promise<Comment[]> {
    let comments = unwrapOr(
      await rpc.api<Comment[]>({
        ListComments: { postId: postId },
      }),
      [],
    ).sort((a, b) =>
      a.publishedAt.toLowerCase().localeCompare(b.publishedAt.toLowerCase()),
    );
    // this.setComments(comments);
    return comments;
  }
}

// AppState.init();
// export const APP = AppState.shared;
