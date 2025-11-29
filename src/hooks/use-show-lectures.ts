import {
    getShowLecturesOnClient,
    setShowLecturesOnClient,
} from "@/server/cookies-on-client";
import { useState } from "react";

export default function useShowLectures() {
    const [showLectures, setShowLectures] = useState(getShowLecturesOnClient);

    const toggleShowLectures = () => {
        const newState = !showLectures;

        setShowLectures(newState);
        setShowLecturesOnClient(newState);
    };

    return {
        showLectures,
        setShowLectures,
        toggleShowLectures,
    };
}
