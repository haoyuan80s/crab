import { mockPostWithCrawlIds, mockPostWithCrawlResponse, mockUserWatch } from "./dev";
import { CommentActionType, PostWithCrawlResponse, UserWatch } from "./model";

// Edit a post's watch status. If the post is not in the user's watch list, add it to the watch list and set its active status accordingly.
export const userEditPostWatch = async (postId: string, initIsActive: boolean): Promise<void> => {
    console.log("[userEditPostWatch] Editing post watch status: ", postId, initIsActive);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}

// Delete a post from the user's watch list.
export const userDeletePostWatch = async (postId: string): Promise<void> => {
    console.log("[userDeletePostWatch] Deleting post watch: ", postId);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}

export const getUserWatchList = async (): Promise<UserWatch> => {
    console.log("[getUserWatchList] Getting user's watch list...");
    return new Promise((resolve) => {
        console.log("[getUserWatchList] Received user's watch list with ", mockUserWatch.activePostIds.length, " active posts and ", mockUserWatch.inactivePostIds.length, " inactive posts...");
        setTimeout(() => {
            resolve(mockUserWatch);
        }, 200);
    });
}

// Given the post ids in the user's watch list, append the last crawl id to each 
// post id, i.e., "{post_id}::{last_crawl_id}". In case that no
// crawl id is available for the post, return "{post_id}".
export const appendLastCrawlIds = async (postIds: string[]): Promise<string[]> => {
    console.log("[appendLastCrawlIds] Append last crawl id for ", postIds.length, " posts...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPostWithCrawlIds);
        }, 200);
    });
}

export const fetchPostWithCrawl = async (postWithCrawlIds: string[]): Promise<PostWithCrawlResponse[]> => {
    console.log("[fetchPostWithCrawl] Fetching post with crawl for ", postWithCrawlIds.length, " posts...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPostWithCrawlResponse);
        }, 200);
    });
}

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
    console.log("[submitCommentActions] Submitting actions for comment (flipping the isSubmitted flag): ", commentId);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200);
    });
}
