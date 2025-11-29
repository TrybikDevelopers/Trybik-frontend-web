"use client";

import { SettingsToggle } from "@/components/settings/settings-toggle";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFirstRender from "@/hooks/use-first-render";
import useShowLectures from "@/hooks/use-show-lectures";
import { useRouter } from "@/i18n/navigation";
import { Globe, Moon, Projector } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function ApplicationAppearance() {
    const t = useTranslations("settings.applicationAppearance");

    const locale = useLocale();
    const router = useRouter();

    const { setTheme, theme } = useTheme();
    const { isFirstRender } = useFirstRender();
    const { showLectures, toggleShowLectures } = useShowLectures();

    return (
        <div>
            <h2 className="text-foreground xs:text-2xl mb-6 text-xl font-bold md:text-3xl">
                {t("text")}
            </h2>
            <Card className="bg-card border-border">
                <CardContent className="xs:px-6 xs:py-4 space-y-2 px-4 py-2">
                    <SettingsToggle
                        title={t("darkMode")}
                        icon={Moon}
                        checked={isFirstRender ? false : theme === "dark"}
                        onCheckedChange={() =>
                            setTheme((prev) =>
                                prev === "dark" ? "light" : "dark",
                            )
                        }
                    />
                    <SettingsToggle
                        title={t("showLectures")}
                        icon={Projector}
                        checked={isFirstRender ? false : showLectures}
                        onCheckedChange={toggleShowLectures}
                    />
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <Globe className="text-foreground h-5 w-5" />
                            <span className="text-foreground font-medium">
                                {t("language")}
                            </span>
                        </div>
                        <Select
                            value={locale}
                            onValueChange={(value) => {
                                const newLocale = value as Locale;

                                router.replace("/settings", {
                                    locale: newLocale,
                                });

                                router.prefetch({ pathname: "/" });
                                router.prefetch({ pathname: "/calendar" });
                                router.prefetch({
                                    pathname: "/ects-calculator",
                                });
                            }}
                        >
                            <SelectTrigger size="sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pl">
                                    {t("polish")}
                                </SelectItem>
                                <SelectItem value="en">
                                    {t("english")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
