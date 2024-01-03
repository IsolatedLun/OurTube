import { T_InputValidator } from "./types";
import { evalMinLength, evalMinMaxLength, evalSpecialCharacters } from "./validators";

export const passwordValidators: T_InputValidator[] = [
    evalMinLength(8),
    evalSpecialCharacters(["$", "#", "*", "%", "-", "_"], false)
]

export const usernameValidators: T_InputValidator[] = [
    evalMinMaxLength(2, 64),
]

export const emailValidators: T_InputValidator[] = [
    evalMinMaxLength(3, 254),
]