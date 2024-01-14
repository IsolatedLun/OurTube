import { useReducer } from "react";
import { E_CommentSectionActions, T_CommentSection, T_CommentSectionActions } from "./types";
import { A_AppendRepliesPayload, T_Comment, T_CommentReply, T_DispatchWithPayloadFn } from "@/components/Modules/Comment/types";

function handleCommentSectionReducer(state: T_CommentSection, action: T_CommentSectionActions) {
    if(action.type === E_CommentSectionActions.APPEND_COMMENTS) {
        return {
            ...state,
            comments: [
                ...state.comments,
                ...action.payload
            ]
        }
    } 
    
    else if(action.type === E_CommentSectionActions.APPEND_REPLIES) {
        const mutState = { ...state };
        const payload = action.payload as A_AppendRepliesPayload;
        const comment = { ...payload.comment }

        comment.replies = (comment.replies ?? []).concat(payload.replies);
        comment.reply_count = comment.replies.length;
        
        const commentIndex = mutState.comments.findIndex(x => x.id === comment.id);
        mutState.comments[commentIndex] = comment;

        console.log(mutState)
        return mutState;
    } 
    
    else if(action.type === E_CommentSectionActions.DELETE_COMMENT) {
        const comment = action.payload as T_Comment;
        return { ...state, comments: state.comments.filter(x => x.id !== comment.id) }
    } 
    
    else if(action.type === E_CommentSectionActions.DELETE_REPLY) {
        const mutState = { ...state };
        const reply = action.payload as T_CommentReply;

        const commentIndex = state.comments.findIndex(x => x.id === reply.parent);
        const comment = mutState.comments[commentIndex]; 
        
        comment.replies = comment.replies.filter(x => x.id !== reply.id);
        comment.reply_count = comment.replies.length;

        mutState.comments[commentIndex] = comment;
        return mutState;
    }
}

const createInitialArgs = () => ({
    comments: []
})

export function useCommentSection(): [T_CommentSection, T_DispatchWithPayloadFn] {
    const [state, dispatch] = useReducer<any, any>(
        handleCommentSectionReducer, 
        { comments: [] } as T_CommentSection, 
        createInitialArgs
    )
    
    return [state as T_CommentSection, dispatch as T_DispatchWithPayloadFn];
}