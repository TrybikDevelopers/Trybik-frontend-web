import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { TimetableFormSchema } from "@/schema/forms/timetable-form-schema";
import type { GeneralGroups } from "@/types/data-access/timetable";
import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
    generalGroups: GeneralGroups;
};

export default function GeneralGroupCombobox({ generalGroups }: Props) {
    const [open, setOpen] = useState(false);

    const t = useTranslations("settings.studentGroups");

    const form = useFormContext<TimetableFormSchema>();

    return (
        <FormField
            control={form.control}
            name="generalGroup"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel className="sr-only">
                        {'t("generalGroup")'}
                    </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "xs:max-w-32 xxs:max-w-28 ml-auto h-8 w-full max-w-24 cursor-pointer justify-between font-normal duration-150",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    {field.value
                                        ? generalGroups.find(
                                              (generalGroup) =>
                                                  generalGroup === field.value,
                                          )
                                        : t("select")}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] p-0">
                            <Command className="w-full max-w-full">
                                <CommandInput
                                    placeholder={t("search")}
                                    className="h-9 w-full"
                                />
                                <CommandList className="w-full">
                                    <CommandEmpty>
                                        {t("groupNotFound")}
                                    </CommandEmpty>
                                    <CommandGroup className="w-full">
                                        {generalGroups.map((generalGroup) => (
                                            <CommandItem
                                                value={generalGroup}
                                                key={generalGroup}
                                                onSelect={() => {
                                                    form.setValue(
                                                        "generalGroup",
                                                        generalGroup,
                                                    );

                                                    setOpen(false);
                                                }}
                                                className="h-8"
                                            >
                                                {generalGroup}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        generalGroup ===
                                                            field.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
