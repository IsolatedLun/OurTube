export type T_ReactSetStateHook<T> = React.Dispatch<React.SetStateAction<T>>;
export type T_Action<T> = { payload: any, type: T };