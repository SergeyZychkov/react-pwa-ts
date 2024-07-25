import { create } from "zustand";

function setChecked(comment: any, checked: boolean) {
    comment.checked = checked;
    return comment;
}

const commentStore = (set: any) => ({
    comments: [],
    addComment: (text: string) =>
        set((state: any) => ({
            comments: [
                ...state.comments,
                {
                    id: Date.now(),
                    text,
                    checked: false
                }
            ],
        })),
    toggleComment: (id: Date) =>
        set((state: any) => ({
            comments: state.comments.map((comment: any) =>
                comment.id === id ? setChecked(comment, !comment.checked) : comment
            ),
        })),
    deleteComment: (id: Date) =>
        set((state: any) => ({
            comments: state.comments.filter((comment: any) => comment.id !== id),
        })),
});

const useCommentStore = create(commentStore);

export default useCommentStore;