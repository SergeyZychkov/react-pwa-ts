import { useState } from 'react';

import useCommentStore from "../utilities/stores/commentStore";

export default function GlobalStore() {

    const [text, setText] = useState("");

    const { comments, addComment, toggleComment, deleteComment } = useCommentStore((state) => {
        return { comments: state.comments, addComment: state.addComment, toggleComment: state.toggleComment, deleteComment: state.deleteComment };
    });
    function handleSubmit() {
        addComment(text);
        setText("");
    }

    return (
        <div>
            <p>State management (global store): </p>
            <input id="commentInput" value={text} onChange={(e) => setText(e.target.value)} /> 
            <button id="saveCommentButton" onClick={handleSubmit}>
                Add new comment
            </button>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Comment</th>
                    <th>Is Completed</th>
                    <th>Complete button</th>
                    <th>Delete button</th>
                </tr>
                </thead>
                <tbody>
                {comments.map((comment: any) =>
                    <tr key={comment.id}>
                        <td>{comment.text}</td>
                        <td>{comment.checked ? "Yes" : "No"}</td>
                        <td><button onClick={() => toggleComment(comment.id)}>Complete</button></td>
                        <td><button onClick={() => deleteComment(comment.id)}>Delete</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};