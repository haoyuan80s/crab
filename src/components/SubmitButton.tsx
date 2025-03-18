import { createSignal, Show } from "solid-js";
import { countCommentsOfActionTYpe } from "../global";

export function SubmitButton(prop: { postId: string }) {
    const [showSlideToConfirm, setShowSlideToConfirm] = createSignal(false);
    return (
        <div
            class="absolute right-5 bottom-10 w-fit h-fit rounded-full"
            onMouseEnter={() => setShowSlideToConfirm(true)}
            onMouseLeave={() => setShowSlideToConfirm(false)}
        >
            <Show
                when={showSlideToConfirm()}
                fallback={
                    <div
                        class="flex w-[54px] h-[54px] rounded-full justify-center items-center bg-crab-green text-white text-custom13 font-medium shadow-[0px_2px_4px_rgba(0,0,0,0.2)]"
                    > Submit
                    </div>
                }
            >
                <SlideToConfirm postId={prop.postId} />
            </Show>
        </div>
    )
}


export function SlideToConfirm(prop: { postId: string }) {
    let sliderRef: HTMLInputElement | undefined;
    const [value, setValue] = createSignal(100); // Start at max for right-to-left
    const min = 0;
    const max = 100;

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setValue(+target.value);
    };

    return (
        <div class="w-full relative font-medium">
            <div class="absolute right-0 bottom-0">
                <div class="relative flex flex-col items-center justify-center">
                    <input
                        ref={sliderRef}
                        type="range"
                        min={min}
                        max={max}
                        step="1"
                        value={value()}
                        onInput={handleInput}
                        class={`shadow-[0px_2px_4px_rgba(0,0,0,0.2)] slide2confirm border-3 border-transparent rounded-full h-[54px] w-[360px] outline-none transition-all duration-300 appearance-none ${value() === min ? "bg-crab-green" : "bg-grey-custom2"}`}
                    />
                    <span class={`absolute inset-0 flex flex-col items-center justify-center font-medium pointer-events-none text-white space-y-0.5`}>
                        <Show
                            when={value() !== min}
                            fallback={<div>Done!</div>}
                        >
                            <div>
                                ← Slide to confirm submitting
                            </div>
                            <div class="text-custom12 text-crab-green">
                                {(() => {
                                    const actions = [
                                        countCommentsOfActionTYpe(prop.postId, "Reply") > 0
                                            ? `${countCommentsOfActionTYpe(prop.postId, "Reply")} Replies`
                                            : null,
                                        countCommentsOfActionTYpe(prop.postId, "Like") > 0
                                            ? `${countCommentsOfActionTYpe(prop.postId, "Like")} Likes`
                                            : null,
                                        countCommentsOfActionTYpe(prop.postId, "Dislike") > 0
                                            ? `${countCommentsOfActionTYpe(prop.postId, "Dislike")} Dislikes`
                                            : null,
                                        countCommentsOfActionTYpe(prop.postId, "Delete") > 0
                                            ? `${countCommentsOfActionTYpe(prop.postId, "Delete")} Deletes`
                                            : null,
                                    ].filter(Boolean); // Remove null/false values
                                    return actions.length > 0 ? actions.join(", ") : null;
                                })()}
                            </div>
                        </Show>
                    </span>
                </div>
            </div>
        </div>
    );
}