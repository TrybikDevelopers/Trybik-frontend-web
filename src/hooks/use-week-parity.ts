import { useMemo } from "react";

const useWeekParity = (): { weekParity: "EVEN" | "ODD" } => {
    const weekParity = useMemo(() => {
        const now = new Date();
        const year = now.getFullYear();

        const octFirst = new Date(year, 9, 1);
        const referenceDate =
            now < octFirst ? new Date(year - 1, 9, 1) : octFirst;

        const getWeekStart = (date: Date): Date => {
            const d = new Date(date);
            const day = d.getDay();
            let diff = 1 - day;
            if (day === 0) diff = -6;
            d.setDate(d.getDate() + diff);
            d.setHours(0, 0, 0, 0);
            return d;
        };

        const referenceWeekStart = getWeekStart(referenceDate);
        const currentWeekStart = getWeekStart(now);

        const msDiff =
            currentWeekStart.getTime() - referenceWeekStart.getTime();
        const daysDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));

        const weeksDiff = Math.floor(daysDiff / 7);

        const isEven = weeksDiff % 2 === 0;

        return isEven ? "EVEN" : "ODD";
    }, []);

    return { weekParity };
};

export default useWeekParity;
