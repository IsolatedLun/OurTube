import { T_DateCondition } from "./utils/types";

export const BACKEND_URL = "http://localhost:8090";
export const BACKEND_FILE_URL = (collectionId: string, recordId: string, path: string) => {
    return BACKEND_URL + `/api/files/${collectionId}/${recordId}/${path}`
}

export const AUTH_SIGNUP_URL = "/auth/signup";
export const AUTH_LOGIN_URL = "/auth/login";
export const CHANNEL_URL = (id: string) => "/channels/" + id;
export const VIDEO_URL = (id: string) => "/videos/" + id;

// Options
export const MAX_VIDEO_TITLE_LINES = 2;

export const VIDEOS_PER_PAGE = 16; 
export const COMMENTS_PER_PAGE = 24; 
export const REPLIES_PER_PAGE = 16; 

// Misc
export const DATE_CONDITIONS: T_DateCondition[] = [
    {
        right: 1000,
        condition: 60,
        text: ' second ago',
        pluralText: ' seconds ago'
    },
    {
        right: 60,
        condition: 60,
        text: ' minute ago',
        pluralText: ' minutes ago'
    },
    {
        right: 60,
        condition: 24,
        text: ' hour ago',
        pluralText: ' hours ago'
    },
    {
        right: 24,
        condition: 30,
        text: ' day ago',
        pluralText: ' days ago'
    },
    {
        right: 30,
        condition: 12,
        text: ' month ago',
        pluralText: ' months ago'
    },
    {
        right: 12,
        condition: 12,
        text: ' year ago',
        pluralText: ' years ago'
    },
    {
        right: 12,
        condition: 100 / 12,
        text: ' decade ago',
        pluralText: ' decades ago'
    },
    {
        right: 100 / 12,
        condition: 10,
        text: ' century ago',
        pluralText: ' centuries ago'
    },
    {
        right: 10,
        condition: null,
        text: ' millenium ago',
        pluralText: ' millennia ago'
    }
]