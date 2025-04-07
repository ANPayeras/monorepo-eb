import { cn } from "@/lib/utils";

export const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col py-5 md:py-10 relative group/feature dark:border-neutral-800 bg-slate-950 rounded-sm",
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-slate-300 dark:from-neutral-500 to-transparent pointer-events-none rounded-t-sm" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-slate-300 dark:from-neutral-500 to-transparent pointer-events-none rounded-b-sm" />
            )}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-slate-900 transition-all duration-200 origin-center" />
            <div className="flex gap-2 md:gap-0 md:flex-col">
                <div className="md:mb-4 relative z-10 pl-10 pr-0 md:px-10 text-neutral-600 dark:text-neutral-400">
                    {icon}
                </div>
                <div className="text-lg font-bold mb-2 relative z-10 pl-0 pr-10 md:px-10">
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-slate-50 dark:text-neutral-800">
                        {title}
                    </span>
                </div>
            </div>
            <p className="text-xs md:text-sm text-slate-50 dark:text-neutral-800 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};