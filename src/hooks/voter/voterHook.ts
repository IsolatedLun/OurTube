import { T_DispatchWithPayloadFn } from "@/components/Modules/Comment/types";
import { T_Voter } from "@/components/Modules/Voter/types";
import { useReducer } from "react";
import { T_Action } from "../types";
import { E_VoteStatus, T_Votable } from "./types";

function handleVoterReducer(state: T_Voter, action: T_Action<E_VoteStatus>) {
    const mutState = { ...state };
    if(action.type === state.status) {
        if(action.type === E_VoteStatus.LIKED)
            mutState.likes -= 1;
        else
            mutState.dislikes -= 1;

        mutState.status = E_VoteStatus.NEUTRAL;
        return mutState;
    }

    if(action.type === E_VoteStatus.LIKED) {
        mutState.likes += 1;
        mutState.status = E_VoteStatus.LIKED;

        if(state.status === E_VoteStatus.DISLIKED)
            mutState.dislikes -= 1;
    } else {
        mutState.dislikes += 1;
        mutState.status = E_VoteStatus.DISLIKED;

        if(state.status === E_VoteStatus.LIKED)
            mutState.likes -= 1;
    }

    return mutState;
}

const createInitialArgs = (props: T_Votable): T_Voter => ({
    collectionName: '',
    id: '',
    status: E_VoteStatus.NEUTRAL,
    likes: props.likes,
    dislikes: props.dislikes
})

export function useVoter(props: T_Votable): [T_Voter, T_DispatchWithPayloadFn] {
    const [ state, dispatch ] = useReducer<any, any>(
        handleVoterReducer, 
        props, 
        createInitialArgs
    );

    return [state as T_Voter, dispatch];
}