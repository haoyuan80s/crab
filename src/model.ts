export type PostType = "YouTubeVideo" | "RedditPost" | "TwitterPost";
export type ChannelType = "YouTubeChannel" | "RedditUser" | "TwitterUser";

export type postMetadataReponse = {
    postId: string;
    postTitle: string;
    postLink: string;
    postThumbnailUrl: string;

    postSummary: string;
    postCreatedAtCommunityTime: Date;
    postLastCommentTime: Date;
    postLastCrawledTime: Date;

    channelId: string;
    channelTitle: string;
    channelLink: string;
    channelThumbnailUrl: string;
}

export type crawlMetadataResponse = {
    crawlId: string;
    crawlTime: Date;
}

export type PostWithCrawlResponse = {
    post: postMetadataReponse;
    crawl: crawlMetadataResponse | null;
    commentsWithActions: CommentWithAction[];
}

// In YouTube, a video is a post.
export type PostRenderInfo = {
    //Granted by social media platform, not our system.
    id: string;
    channelId: string;
    link: string;
    title: string;
    thumbnailUrl: string;
    summary: string;
    createdAtCommunityTime: Date;
    lastCrawledTime: Date;
    lastCommentTime: Date;
};

// In YouTube, a channel is a channel
export type ChannelRenderInfo = {
    //Granted by social media platform, not our system.
    id: string;
    link: string;
    title: string;
    thumbnailUrl: string;
}

export type UserWatch = {
    // Here the id is the post id granted by social media platform.
    activePostIds: string[];
    inactivePostIds: string[];
}

export type CommentActionType = "Like" | "Dislike" | "Reply" | "Delete";

export type CommentAction = {
    type: CommentActionType;
    desc: string;
}

export type CommentWithAction = {
    // Granted by our system
    id: string;
    // Granted by social media platform
    communityCommentId: string;
    crawlId: string;
    postId: string;
    authorName: string;
    authorThumbnailUrl: string;
    authorCommunityId: string;
    createdAtCommunityTime: Date;
    parentId: string | null;
    content: string;
    likeCount: number;

    // This is the initial actions of the comment passed over from the backend. 
    // User can edit upon, and thus do not use it outside of the initial setup.
    actions: CommentAction[];
    // This is the initial status when passed over from the backend.
    // User can edit upon, and thus do not use it outside of the initial setup.
    isSubmitted: boolean;
}

export const hasAction = (comment: CommentWithAction, actionType: CommentActionType): boolean => {
    return comment.actions.some((action) => action.type === actionType);
}

