import { createSignal, onCleanup } from "solid-js";
import { addActionToCommentsStore, DEFAULT_REPLY, hasAction, removeFromRepliesStore, removeActionFrCommentsStore, repliesStore, setRepliesStore, timeAgo } from "../global";
import { CommentWithAction } from "../model";

export function CommentItemView(prop: { comment: CommentWithAction }) {
    const [menuPos, setMenuPos] = createSignal<{ x: number; y: number } | null>(null);

    const handleClick = (e: MouseEvent) => {
        console.log("[NOODLE] clicked!", e.clientX, e.clientY);
        if (menuPos()) {
            setMenuPos(null);
        } else {
            setMenuPos({ x: e.clientX, y: e.clientY });
        }
    };

    function isOngoingReplyValid(comment: CommentWithAction) {
        // return repliesStore[comment.id] && repliesStore[comment.id] !== DEFAULT_REPLY;
        return repliesStore[comment.id]
    }

    function isReplyAvailableOrOngoing(comment: CommentWithAction) {
        return hasAction(comment, "Reply") || repliesStore[comment.id]
    }
    return (
        <div
            class="hover:bg-grey-custom1 px-2 rounded-lg"
            onClick={(e) => handleClick(e)}
        >
            <div class="flex items-start space-x-2 text-custom13 pb-2 pt-2.5">
                {/* Author Thumbnail */}
                <img
                    src={prop.comment.authorThumbnailUrl}
                    alt={prop.comment.authorName}
                    class="w-[30px] h-[30px] rounded-full"
                    onClick={(e) => e.stopPropagation()}
                >
                </img>
                <div class="flex flex-col w-full h-full">
                    <div class="flex space-x-2">
                        <div class="flex flex-col w-full space-y-1">
                            {/* Comment Metadata Line */}
                            <div
                                class="flex space-x-1 text-custom11 text-grey-channel-text w-fit"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div>{prop.comment.authorName} · {timeAgo(prop.comment.createdAtCommunityTime)}</div>
                                {prop.comment.likeCount > 0 &&
                                    <div class="flex space-x-1">
                                        <div> · </div>
                                        <img
                                            src="/thumbsup.svg"
                                            class="shrink-0 inline w-[8px] h-auto"
                                        />
                                        <div>{prop.comment.likeCount}</div>
                                    </div>
                                }
                            </div>
                            {/* Comment Content */}
                            <div
                                class="leading-[18px] text-grey-channel-text w-fit" innerHTML={prop.comment.content}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        {/* Action Button */}
                        <div class="flex">
                            {/* Reply button */}
                            <button
                                class={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${(!isReplyAvailableOrOngoing(prop.comment)) ? "hover:bg-grey-custom2" : ""} `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isReplyAvailableOrOngoing(prop.comment)) {
                                        setRepliesStore(prop.comment.id, DEFAULT_REPLY)
                                    }
                                }}
                            >
                                <img
                                    src={`${isReplyAvailableOrOngoing(prop.comment) ? "/ReplyOn.svg" : "/ReplyOff.svg"}`}
                                    class="h-[15px]"
                                />
                            </button>
                            <button
                                class={`w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-grey-custom2`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasAction(prop.comment, "Like")) {
                                        removeActionFrCommentsStore(prop.comment.id, "Like");
                                    } else {
                                        addActionToCommentsStore(prop.comment.id, "Like", "Liked!");
                                        if (hasAction(prop.comment, "Dislike")) {
                                            removeActionFrCommentsStore(prop.comment.id, "Dislike");
                                        }
                                    }
                                }}
                            >
                                <img
                                    src={`${hasAction(prop.comment, "Like") ? "/LikeOn.svg" : "/LikeOff.svg"}`}
                                    class="w-[14px] h-auto"
                                />
                            </button>
                            <button
                                class="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-grey-custom2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasAction(prop.comment, "Dislike")) {
                                        removeActionFrCommentsStore(prop.comment.id, "Dislike");
                                    } else {
                                        addActionToCommentsStore(prop.comment.id, "Dislike", "Disliked!");
                                        if (hasAction(prop.comment, "Like")) {
                                            removeActionFrCommentsStore(prop.comment.id, "Like");
                                        }
                                    }
                                }}
                            >
                                <img
                                    src={`${hasAction(prop.comment, "Dislike") ? "/DislikeOn.svg" : "/DislikeOff.svg"}`}
                                    class="w-[14px] h-auto"
                                />
                            </button>
                            <button
                                class="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:bg-grey-custom2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasAction(prop.comment, "Delete")) {
                                        removeActionFrCommentsStore(prop.comment.id, "Delete");
                                    } else {
                                        addActionToCommentsStore(prop.comment.id, "Delete", "Delete!");
                                    }
                                }}
                            >
                                <img
                                    src={`${hasAction(prop.comment, "Delete") ? "/DeleteOn.svg" : "/DeleteOff.svg"}`}
                                    class="w-[14px] h-auto"
                                />
                            </button>
                        </div>
                    </div>
                    {/* Reply box */}
                    {isReplyAvailableOrOngoing(prop.comment) && (
                        <div
                            class={`relative mb-1 mt-1.5 h-[52px] rounded-xl bg-white border-1 border-crab-green-light w-full ${isOngoingReplyValid(prop.comment) ? "text-black" : "text-grey-custom2"}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <textarea
                                value={repliesStore[prop.comment.id]}
                                onInput={(e) => setRepliesStore(prop.comment.id, e.currentTarget.value)}
                                onBlur={() => {
                                    removeActionFrCommentsStore(prop.comment.id, "Reply");
                                    if (isOngoingReplyValid(prop.comment)) {
                                        addActionToCommentsStore(prop.comment.id, "Reply", repliesStore[prop.comment.id]);
                                    } else {
                                        setRepliesStore(prop.comment.id, "")
                                        removeFromRepliesStore(prop.comment.id);
                                    }
                                }}
                                class="absolute inset-1.5 right-5 resize-none no-scrollbar border-none focus:border-none focus:outline-none bg-transparent"
                            />
                            <button
                                class="absolute right-0 p-1 rounded-full hover:bg-grey-custom1 m-0.5"
                                onClick={() => {
                                    setRepliesStore(prop.comment.id, "")
                                    removeFromRepliesStore(prop.comment.id);
                                    removeActionFrCommentsStore(prop.comment.id, "Reply");
                                }}
                            >
                                <img
                                    src="/buttonClose.svg"
                                    class="w-[8px] h-auto"
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {menuPos() && (
                <div
                    class="fixed bg-grey-channel-text rounded-full px-3 py-2 w-fit h-fit flex justify-center items-center text-white font-medium text-custom13 space-x-2 leading-none shadow-[0px_2px_4px_rgba(0,0,0,0.2)]"
                    style={{
                        left: `${menuPos()!.x}px`,
                        top: `${menuPos()!.y}px`,
                        transform: `translate(-50%, -50%)`
                    }}
                    onMouseLeave={() => setMenuPos(null)}
                >
                    <div>
                        Submit
                        <span class="pl-1">
                            {(() => {
                                const actions = [
                                    hasAction(prop.comment, "Reply")
                                        ? "1 Reply"
                                        : null,
                                    hasAction(prop.comment, "Like")
                                        ? "1 Like"
                                        : null,
                                    hasAction(prop.comment, "Dislike")
                                        ? "1 Dislike"
                                        : null,
                                    hasAction(prop.comment, "Delete")
                                        ? "1 Delete"
                                        : null,
                                ].filter(Boolean); // Remove null/false values
                                return actions.length > 0 ? actions.join(", ") : null;
                            })()}
                        </span>
                        ?
                    </div>
                    <button class="bg-crab-green rounded-md h-[26px] w-[30px] flex items-center justify-center hover:bg-crab-green-dark text-custom12 font-semibold leading-none shadow-[0px_1px_2px_rgba(0,0,0,0.2)]">
                        OK
                    </button>
                </div>
            )
            }
        </div >
    )
}
