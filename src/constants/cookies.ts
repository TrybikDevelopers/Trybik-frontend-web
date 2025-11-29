import { env } from "@/env";

export const TIMETABLE_SETTINGS_COOKIE_KEY = "NEXT_TIMETABLE_SETTINGS" as const;
export const SHOW_LECTURES_COOKIE_KEY = "NEXT_SHOW_LECTURES" as const;

export const timetableSettingsCookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    sameSite: "lax" as const,
    secure: env.NEXT_PUBLIC_IS_PROD,
};

export const showLecturesCookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    sameSite: "lax" as const,
    secure: env.NEXT_PUBLIC_IS_PROD,
};
