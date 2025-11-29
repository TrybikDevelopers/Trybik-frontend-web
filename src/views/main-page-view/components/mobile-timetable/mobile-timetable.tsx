"use client";

import type { TimetableSettingsSchema } from "@/schema/timetable-settings-schema";
import useMobileTimetable from "../../hooks/use-mobile-timetable";
import LessonsCards from "./lessons-cards";
import TimetableHeader from "./timetable-header";

type Props = {
    timetableSettings: TimetableSettingsSchema;
    showLectures: boolean;
};

export default function MobileTimetable({
    timetableSettings,
    showLectures,
}: Props) {
    const {
        hours,
        currentDayData,
        selectedDayIndex,
        incrementDayIndex,
        decrementDayIndex,
        toggleWeekParity,
        weekParity,
    } = useMobileTimetable(timetableSettings);

    return (
        <div className="mx-auto flex h-full w-full max-w-2xl flex-col lg:hidden">
            <TimetableHeader
                incrementDayIndex={incrementDayIndex}
                decrementDayIndex={decrementDayIndex}
                selectedDayIndex={selectedDayIndex}
                weekParity={weekParity}
                toggleWeekParity={toggleWeekParity}
            />
            <LessonsCards
                hours={hours}
                currentDayData={currentDayData}
                weekDayIndex={selectedDayIndex}
                weekParity={weekParity}
                showLectures={showLectures}
            />
        </div>
    );
}
