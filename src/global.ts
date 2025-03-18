import { createStore } from "solid-js/store";
import { CommentActionType, CommentWithAction, PostInfo, ChannelInfo } from "./model";
import { createResource, createRoot } from "solid-js";
import { fetchComments, fetchPosts, fetchChannels } from "./rpc";
import { createEffect } from "solid-js";

export const DEFAULT_TAB = "AllReact";
export const TABS = ["AllReact", "Reply", "Like", "Dislike", "Delete", "NoReact"];
export const DEFAULT_REPLY = ":)";

export function timeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `now`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}wk ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}y ago`;
}

export function getDateString(date: Date): string {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const [commentsResource, { refetch: refetchComments }] = createResource(fetchComments);
export const [postsResource, { refetch: refetchPosts }] = createResource(fetchPosts);
export const [channelResource, { refetch: refetchChannels }] = createResource(fetchChannels);

export const [commentsStore, setCommentsStore] = createStore<CommentWithAction[]>([]);

// Manage reply text in textarea: comment_id => reply string.
export const [repliesStore, setRepliesStore] = createStore<Record<string, string>>({});

createRoot(() => {
    createEffect(() => {
        const comments = commentsResource();
        console.log("[createEffect] Refreshing commentsStore based on commentsResource...");
        if (comments) setCommentsStore(comments);
        console.log("[createEffect] Refreshed commentsStore based on commentsResource...");
    });

    createEffect(() => {
        if (commentsStore.length === 0) return;
        console.log("[createEffect] Refreshing repliesStore based on commentsStore");
        const initialReplies: Record<string, string> = {};
        commentsStore.forEach((comment) => {
            const reply = comment.actions.find((r) => r.type === "Reply");
            if (reply) {
                initialReplies[comment.id] = reply.desc;
            }
        });
        setRepliesStore(initialReplies);
        console.log("[createEffect] Refreshed repliesStore based on commentsStore");
    });
});

export const removeActionFrCommentsStore = (commentId: string, actionType: CommentActionType) => {
    setCommentsStore(
        (comment) => comment.id === commentId,
        "actions",
        (actions) => actions.filter((action) => action.type !== actionType)
    );
};

export const addActionToCommentsStore = (commentId: string, actionType: CommentActionType, desc: string) => {
    setCommentsStore(
        (comment) => comment.id === commentId,
        "actions",
        (actions) => [...actions, { type: actionType, desc: desc }] // Append new action
    );
};

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

export const hasAction = (comment: CommentWithAction, actionType: CommentActionType): boolean => {
    return comment.actions.some((action) => action.type === actionType);
}

export const removeFromRepliesStore = (commentId: string) => {
    setRepliesStore((prev) => {
        const { [commentId]: _, ...rest } = prev; // Remove the key by destructuring
        return rest; // Return the new object without the deleted key
    });
};

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