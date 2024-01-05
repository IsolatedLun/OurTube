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