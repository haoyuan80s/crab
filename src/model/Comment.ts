// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CommentId } from "./CommentId";
import type { PostId } from "./PostId";
import type { UserId } from "./UserId";

export type Comment = { id: CommentId, postId: PostId, updatedAt: string, publishedAt: string, authorId: UserId, authorName: string, authorThumbnailUrl: string, parentId: CommentId | null, likes: number, content: string, };
