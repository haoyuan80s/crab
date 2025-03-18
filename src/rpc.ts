import { mockChannels, mockComments, mockPosts } from "./dev";
import { userWatchStore } from "./global";
import { ChannelInfo, CommentActionType, CommentWithAction, PostInfo } from "./model";

// <FLOW 1> Manage Watch List
// Edit a post's watch status. If the post is not in the user's watch list, add it to the watch list and set its active status accordingly.
export const userEditPostWatch = async (postId: string, initIsActive: boolean): Promise<void> => {
    console.log("[userEditPostWatch] Editing post watch status: ", postId, initIsActive);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}
// </FLOW 1>

// <FLOW 2> User Visit Flow (When an AccountOwner opens the app)

// Identify the last crawl ids for each active post.
export const identifyLastCrawlIdsForActivePosts = async (): Promise<Record<string, string>> => {
    console.log("[identifyLastCrawlIdsForActivePosts] Identifying last crawl ids for active posts...");

    const postId2LastCrawlId: Record<string, string> = {};
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(postId2LastCrawlId);
        }, 200);
    });
}

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
    const activePostIds = userWatchStore.activePostIds;
    console.log("[triggerRecrawl] Active post ids: ", activePostIds);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}
// </FLOW 3>

// <FLOW 4> Action Suggestion and Editing Flow (Once a crawl is completed...)
// Edit or add an action to a comment.
export const editAction = async (commentId: string, actionType: CommentActionType, desc: string): Promise<void> => {
    console.log("[editAction] Editing action: ", commentId, actionType, desc);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}

export const deleteAction = async (commentId: string, actionType: CommentActionType): Promise<void> => {
    console.log("[deleteAction] Deleting action: ", commentId, actionType);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}

export const submitCommentActions = async (commentId: string): Promise<void> => {
    console.log("[submitCommentActions] Submitting actions for comment: ", commentId);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}
// </FLOW 4>