import { useReducer } from "react";
import { E_CommentSectionActions, T_CommentSection } from "./types";
import { A_AppendRepliesPayload, T_Comment, T_CommentReply, T_DispatchWithPayloadFn } from "@/components/Modules/Comment/types";
import { T_Action } from "../types";

const recountCommentReplies = (comments: T_Comment[]) => {
    return comments.reduce((sum, x) => sum += x.reply_count, 0);
}

function handleCommentSectionReducer(state: T_CommentSection, action: T_Action<E_CommentSectionActions>): T_CommentSection {
    if(action.type === E_CommentSectionActions.APPEND_COMMENTS) {
        const payload = action.payload as T_Comment[];
        let totalReplyCount = state.totalReplyCount;
        
        if(state.totalReplyCount === 0) {
            totalReplyCount = recountCommentReplies(payload);
        }

        return {
            ...state,
            totalReplyCount,
            comments: [
                ...state.comments,
                ...action.payload
            ]
        }
    } 
    
    else if(action.type === E_CommentSectionActions.APPEND_REPLIES) {
        const mutState = { ...state };
        const payload = action.payload as A_AppendRepliesPayload;
        const comment = { ...payload.comment };

        const originalReplyCount = comment.reply_count;
        comment.replies = (comment.replies ?? []).concat(payload.replies);
        comment.reply_count = comment.replies.length;

        const commentIndex = mutState.comments.findIndex(x => x.id === comment.id);
        mutState.comments[commentIndex] = comment;

        mutState.totalReplyCount += (comment.reply_count - originalReplyCount);
        return mutState;
    } 
    
    else if(action.type === E_CommentSectionActions.DELETE_COMMENT) {
        const mutState = { ...state };
        const comment = action.payload as T_Comment;

        mutState.comments = mutState.comments.filter(x => x.id !== comment.id);
        mutState.totalReplyCount -= comment.reply_count;

        return mutState;
    } 
    
    else if(action.type === E_CommentSectionActions.DELETE_REPLY) {
        const mutState = { ...state };
        const reply = action.payload as T_CommentReply;

        const commentIndex = state.comments.findIndex(x => x.id === reply.parent);
        const comment = mutState.comments[commentIndex]; 
        
        comment.replies = comment.replies.filter(x => x.id !== reply.id);
        comment.reply_count = comment.replies.length;

        mutState.comments[commentIndex] = comment;
        mutState.totalReplyCount -= 1;
        return mutState;
    }

    return state;
}

const createInitialArgs = (): T_CommentSection => ({
    comments: [],
    totalReplyCount: 0
})

export function useCommentSection(): [T_CommentSection, T_DispatchWithPayloadFn] {
    const [state, dispatch] = useReducer<any, any>(handleCommentSectionReducer, null, createInitialArgs);
    
    return [state as T_CommentSection, dispatch as T_DispatchWithPayloadFn];
}