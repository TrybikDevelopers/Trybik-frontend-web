import DownloadMobileAppDialog from "@/components/download-mobile-app-dialog";
import { getShowLectures } from "@/server/cookies";
import { getValidTimetableSettings } from "@/server/data-access/timetable";
import { api, HydrateClient } from "@/trpc/server";
import DesktopTimetable from "./components/desktop-timetable/desktop-timetable";
import MobileTimetable from "./components/mobile-timetable/mobile-timetable";
import TimetableForm from "./components/timetable-form/timetable-form";

export default async function MainPageView() {
    const { timetableSettings } = await getValidTimetableSettings();

    if (!timetableSettings) {
        void api.timetable.getGeneralGroups.prefetch();

        return (
            <HydrateClient>
                <TimetableForm />
            </HydrateClient>
        );
    }

    void api.timetable.getTimetable.prefetch({
        generalGroup: timetableSettings.generalGroup,
        groups: timetableSettings.groups,
    });
    void api.timetable.getAcademicHours.prefetch();

    const showLectures = await getShowLectures();

    return (
        <>
            <HydrateClient>
                <div className="text-foreground flex h-full w-full flex-col">
                    <MobileTimetable
                        timetableSettings={timetableSettings}
                        showLectures={showLectures}
                    />

                    <DesktopTimetable
                        timetableSettings={timetableSettings}
                        showLectures={showLectures}
                    />
                </div>
            </HydrateClient>
            <DownloadMobileAppDialog />
        </>
    );
}
