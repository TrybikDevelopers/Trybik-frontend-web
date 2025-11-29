import "server-only";

import {
    SHOW_LECTURES_COOKIE_KEY,
    TIMETABLE_SETTINGS_COOKIE_KEY,
    timetableSettingsCookieOptions,
} from "@/constants/cookies";
import {
    type TimetableSettingsSchema,
    timetableSettingsSchema,
} from "@/schema/timetable-settings-schema";
import { cookies } from "next/headers";

export const filterTimetableSettingsInput = (
    data: TimetableSettingsSchema,
): TimetableSettingsSchema => {
    // filter out potential unwanted keys
    // for now (27.07.2025) there are no unwanted keys but may be in the future
    return {
        generalGroup: data.generalGroup,
        groups: data.groups,
    };
};

export const setTimetableSettings = async (data: TimetableSettingsSchema) => {
    const timetableSettingsString = JSON.stringify(
        filterTimetableSettingsInput(data),
    );

    (await cookies()).set(
        TIMETABLE_SETTINGS_COOKIE_KEY,
        timetableSettingsString,
        timetableSettingsCookieOptions,
    );
};

export const getTimetableSettings =
    async (): Promise<TimetableSettingsSchema | null> => {
        const timetableSettingsCookie = (await cookies()).get(
            TIMETABLE_SETTINGS_COOKIE_KEY,
        );
        if (!timetableSettingsCookie) return null;

        try {
            const parsedJson = JSON.parse(timetableSettingsCookie.value);
            if (!timetableSettingsSchema.safeParse(parsedJson).success)
                return null;

            return parsedJson;
        } catch {
            return null;
        }
    };

export const getShowLectures = async (): Promise<boolean> => {
    const showLecturesCookie = (await cookies()).get(SHOW_LECTURES_COOKIE_KEY);
    if (!showLecturesCookie) return true;

    return showLecturesCookie.value === "true";
};
