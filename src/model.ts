export type PostType = "YouTubeVideo" | "RedditPost" | "TwitterPost";
export type ChannelType = "YouTubeChannel" | "RedditUser" | "TwitterUser";

export type CommentActionType = "Like" | "Dislike" | "Reply" | "Delete";

export type CommentAction = {
    type: CommentActionType;
    desc: string;
}

export type CommentWithAction = {
    // Granted by our system
    id: string;
    comunityCommentId: string;

    crawlId: string;
    postId: string;
    authorName: string;
    authorThumbnailUrl: string;
    authorCommunityId: string;
    createdAtCommunityTime: Date;
    parentId: string | null;
    content: string;
    likeCount: number;
    actions: CommentAction[];
    isSubmitted: boolean;
}

// In YouTube, a video is a post.
export type PostInfo = {
    // Note that this is the id Granted by social media platform, not our system.
    id: string;

    type: PostType;
    channelId: string;
    link: string;
    title: string;
    createdAtCommunityTime: Date;
    thumbnailUrl: string;
    lastTrackedTime: Date;
    lastCommentTime: Date;
    summary: string;

    // Users can deactivate a post. When a post is deactivated, it won't be crawled.
    isActive: boolean;
};

// In YouTube, a channel is a channel
export type ChannelInfo = {
    id: string;
    type: ChannelType;
    link: string;
    title: string;
    thumbnailUrl: string;
}

export type UserInfo = {
    // Granted by our system
    id: string;
    // Granted by social media platform
    userCommunityId: string;
    // Posts that the user is watching (both active and inactive).
    posts: PostInfo[];
    // Channels that the user is watching. It consists of channels of all the posts
    // that the user is watching (both active and inactive).
    channels: ChannelInfo[];
}
