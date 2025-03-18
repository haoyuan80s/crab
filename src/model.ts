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
    lastTrackedTime: Date;
    lastCommentTime: Date;
    summary: string;

    // Users can deactivate a post. When a post is deactivated, it won't be crawled.
    isActive: boolean;
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
    actions: CommentAction[];
    isSubmitted: boolean;
}