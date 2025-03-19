import { createStore } from "solid-js/store";
import { ChannelRenderInfo, CommentActionType, CommentWithAction, PostRenderInfo, PostWithCrawlResponse, UserWatch } from "./model";
import * as rpc from "./rpc";
import { createSignal } from "solid-js";

export const [userWatchStore, setUserWatchStore] = createStore<UserWatch>({
    activePostIds: [],
    inactivePostIds: [],
});

// Track the posts and for each a crawl that are in display in the app.
export const [displayPostWithCrawlIds, setDisplayPostWithCrawlIds] = createSignal<string[]>();

// Derived based on postWithCrawlResource. The first two are not mutable and the last one is mutable.
export const [channelRenderInfos, setChannelRenderInfos] = createSignal<ChannelRenderInfo[]>([]);
export const [postRenderInfos, setPostRenderInfos] = createSignal<PostRenderInfo[]>([]);
export const [commentsStore, setCommentsStore] = createStore<CommentWithAction[]>([]);

// Manage reply text in textarea: comment_id => reply string.
export const [repliesStore, setRepliesStore] = createStore<Record<string, string>>({});

// Status mutation functions
export const editPostWatch = (postId: string, isActive: boolean) => {
    rpc.userEditPostWatch(postId, isActive);
    if (isActive) {
        userWatchStore.activePostIds.push(postId);
        userWatchStore.inactivePostIds = userWatchStore.inactivePostIds.filter((id) => id !== postId);
    } else {
        userWatchStore.activePostIds = userWatchStore.activePostIds.filter((id) => id !== postId);
        userWatchStore.inactivePostIds.push(postId);
    }
}

export const deletePostWatch = (postId: string) => {
    rpc.userDeletePostWatch(postId);
    userWatchStore.activePostIds = userWatchStore.activePostIds.filter((id) => id !== postId);
    userWatchStore.inactivePostIds = userWatchStore.inactivePostIds.filter((id) => id !== postId);
}

export const removeCommentAction = (commentId: string, actionType: CommentActionType) => {
    rpc.deleteAction(commentId, actionType);
    setCommentsStore(
        (comment) => comment.id === commentId,
        "actions",
        (actions) => actions.filter((action) => action.type !== actionType)
    );
};

export const addCommentAction = (commentId: string, actionType: CommentActionType, desc: string) => {
    rpc.editAction(commentId, actionType, desc);
    setCommentsStore(
        (comment) => comment.id === commentId,
        "actions",
        (actions) => [...actions, { type: actionType, desc: desc }] // Append new action
    );
};

export const removeFromRepliesStore = (commentId: string) => {
    setRepliesStore((prev) => {
        const { [commentId]: _, ...rest } = prev; // Remove the key by destructuring
        return rest; // Return the new object without the deleted key
    });
};

// Status query functions
export const getCommnentsOfActionType = (postId: string, actionType: CommentActionType): CommentWithAction[] => {
    return commentsStore.filter((comment) =>
        comment.actions.some((action) => action.type === actionType && comment.postId === postId)
    );
}

export const countCommentsOfActionTYpe = (postId: string, actionType: CommentActionType): number => {
    return getCommnentsOfActionType(postId, actionType).length;
}

export const getCommentsWithAnyAction = (postId: string): CommentWithAction[] => {
    return commentsStore.filter((comment) =>
        comment.postId === postId && comment.actions.length > 0
    );
}

export const countCommentsWithAnyAction = (postId: string): number => {
    return getCommentsWithAnyAction(postId).length;
}

export const getCommentsWithNoAction = (postId: string): CommentWithAction[] => {
    return commentsStore.filter((comment) =>
        comment.postId === postId && comment.actions.length === 0
    );
}

export const countCommentsWithNoAction = (postId: string): number => {
    return getCommentsWithNoAction(postId).length;
}

export const countCommentsByTab = (postId: string, tab: string): number => {
    if (tab === "Like") {
        return countCommentsOfActionTYpe(postId, "Like");
    }
    if (tab === "Dislike") {
        return countCommentsOfActionTYpe(postId, "Dislike");
    }
    if (tab === "Reply") {
        return countCommentsOfActionTYpe(postId, "Reply");
    }
    if (tab === "Delete") {
        return countCommentsOfActionTYpe(postId, "Delete");
    }
    if (tab === "NoReact") {
        return countCommentsWithNoAction(postId);
    }
    if (tab === "AllReact") {
        return countCommentsOfActionTYpe(postId, "Like") + countCommentsOfActionTYpe(postId, "Dislike") + countCommentsOfActionTYpe(postId, "Reply") + countCommentsOfActionTYpe(postId, "Delete");
    }
    return -1
}

export function extractCommentsFromPostWithCrawlResponse(response: PostWithCrawlResponse[]): CommentWithAction[] {
    const comments: CommentWithAction[] = [];
    for (const pwcr of response) {
        for (const comment of pwcr.commentsWithActions) {
            comments.push(comment);
        }
    }
    return comments;
}

export function extractPostRenderInfosFromPostWithCrawlResponse(response: PostWithCrawlResponse[]): PostRenderInfo[] {
    const posts: PostRenderInfo[] = [];
    for (const pwcr of response) {
        posts.push({
            id: pwcr.post.postId,
            channelId: pwcr.post.channelId,
            link: pwcr.post.postLink,
            title: pwcr.post.postTitle,
            thumbnailUrl: pwcr.post.postThumbnailUrl,
            summary: pwcr.post.postSummary,
            createdAtCommunityTime: pwcr.post.postCreatedAtCommunityTime,
            lastCrawledTime: pwcr.post.postLastCrawledTime,
            lastCommentTime: pwcr.post.postLastCommentTime,
        });
    }
    return posts;
}

export function extractChannelRenderInfosFromPostWithCrawlResponse(response: PostWithCrawlResponse[]): ChannelRenderInfo[] {
    const channelMap = new Map<string, ChannelRenderInfo>();
    for (const pwcr of response) {
        const channel: ChannelRenderInfo = {
            id: pwcr.post.channelId,
            link: pwcr.post.channelLink,
            title: pwcr.post.channelTitle,
            thumbnailUrl: pwcr.post.channelThumbnailUrl
        };
        if (!channelMap.has(channel.id)) {
            channelMap.set(channel.id, channel);
        }
    }
    return Array.from(channelMap.values());
}