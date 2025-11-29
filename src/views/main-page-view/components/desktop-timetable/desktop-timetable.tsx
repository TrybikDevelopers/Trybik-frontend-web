"use client";

import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import useDesktopTimetable from "../../hooks/use-desktop-timetable";
import DesktopTimetableGrid from "./desktop-timetable-grid";
import DesktopTimetableHeader from "./desktop-timetable-header";

type Props = {
    timetableSettings: TimetableSettingsSchema;
    showLectures: boolean;
};

export default function DesktopTimetable({
    timetableSettings,
    showLectures,
}: Props) {
    const { hours, timetableData, weekParity, toggleWeekParity } =
        useDesktopTimetable(timetableSettings);

    return (
        <div className="mx-auto hidden h-full w-full max-w-[1920px] flex-col p-4 lg:flex">
            <DesktopTimetableHeader
                weekParity={weekParity}
                toggleWeekParity={toggleWeekParity}
            />
            <DesktopTimetableGrid
                hours={hours}
                timetableData={timetableData}
                weekParity={weekParity}
                showLectures={showLectures}
            />
        </div>
    );
}
