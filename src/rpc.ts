import { mockChannels, mockComments, mockPosts } from "./dev";
import { ChannelInfo, CommentWithAction, PostInfo } from "./model";

// <FLOW 1> Watching and Managing Posts
// Edit a post's watch status. If the post is not in the user's watch list, add it to the watch list and set its active status accordingly.
export const userEditPostWatch = async (postId: string, isActive: boolean): Promise<void> => {
    console.log("[userEditPostWatch] Editing post watch status: ", postId, isActive);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}
// </FLOW 1>

// <FLOW 2> User Visit Flow (When an AccountOwner opens the app)
export const fetchComments = async (): Promise<CommentWithAction[]> => {
    console.log("[fetchComments] Fetching from API...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("[fetchComments] RPC response received! Number of received comments:", mockComments.length);
            resolve(mockComments);
        }, 2000);
    });
};

export const fetchPosts = async (): Promise<PostInfo[]> => {
    console.log("[fetchPosts] Fetching from API...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("[fetchPosts] RPC response received! Number of received posts:", mockPosts.length);
            resolve(mockPosts);
        }, 1500);
    });
};

export const fetchChannels = async (): Promise<ChannelInfo[]> => {
    console.log("[fetchChannels] Fetching from API...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("[fetchChannels] RPC response received! Number of received channels:", mockChannels.length);
            resolve(mockChannels);
        }, 1000);
    });
};
// </FLOW 2>

// <FLOW 3> Recrawl Process (Triggered by User or System on behalf of User)
export const triggerRecrawl = async (): Promise<void> => {
    console.log("[triggerRecrawl] Triggering recrawl...");
    // Passing over the active post ids. Although server-side may also have this
    // information, UI likely has the most up-to-date information (in case the
    // user has just edited the post watch status and it hasn't reached the server).
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}
// </FLOW 3>

// <FLOW 4> Action Suggestion and Editing Flow (Once a crawl is completed...)

// </FLOW 4>