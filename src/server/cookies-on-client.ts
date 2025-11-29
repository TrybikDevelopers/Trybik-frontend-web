import {
    SHOW_LECTURES_COOKIE_KEY,
    showLecturesCookieOptions,
} from "@/constants/cookies";
import { getCookie, setCookie } from "cookies-next";

export const getShowLecturesOnClient = () => {
    const value = getCookie(SHOW_LECTURES_COOKIE_KEY);
    if (!value) return true;

    return value === "true";
};

export const setShowLecturesOnClient = (value: boolean) => {
    setCookie(
        SHOW_LECTURES_COOKIE_KEY,
        value.toString(),
        showLecturesCookieOptions,
    );
};
