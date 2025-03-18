export type PostType = "YouTubeVideo" | "RedditPost" | "TwitterPost";
export type ChannelType = "YouTubeChannel" | "RedditUser" | "TwitterUser";

// In YouTube, a video is a post.
export type PostInfo = {
    //Granted by social media platform, not our system.
    id: string;

    type: PostType;
    channelId: string;
    link: string;
    title: string;
    createdAtCommunityTime: Date;
    thumbnailUrl: string;
    lastCrawledTime: Date;
    lastCommentTime: Date;
    summary: string;

    // This is the initial active status of the post. User can edit upon, and 
    // thus do not use it outside of the initial setup.
    initIsActive: boolean;
};

// In YouTube, a channel is a channel
export type ChannelInfo = {
    //Granted by social media platform, not our system.
    id: string;
    type: ChannelType;
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
    initActions: CommentAction[];
    // This is the initial status when passed over from the backend.
    // User can edit upon, and thus do not use it outside of the initial setup.
    initIsSubmitted: boolean;
}