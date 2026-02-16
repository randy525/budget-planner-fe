import {format, isToday, isYesterday, parseISO} from "date-fns";

export const dateToString = (dateStr) => {
    const date = parseISO(dateStr);

    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";

    return format(date, "MMMM d");
};

export const formatDateTime = (dateStr) => {
    const date = parseISO(dateStr);

    return [format(date, "yyyy-MM-dd"), format(date, "HH:mm")];
};

export const formatDate = (date) => {
    return format(date, "yyyy-MM-dd")
}

export const formatTime = (date) => {
    return format(date, "HH:mm")
}

export const financialGoalIcons = [
    "lucide:target",
    "lucide:wallet",
    "lucide:tree-palm",
    "lucide:smartphone",
    "lucide:piggy-bank",
    "lucide:dollar-sign",
    "lucide:coins",
    "lucide:monitor-smartphone",
    "lucide:gift",
    "lucide:shopping-cart",
    "lucide:home",
    "lucide:car",
    "lucide:calendar",
    "lucide:clipboard-list",
    "lucide:percent",
    "lucide:receipt",
    "lucide:building-2",
    "lucide:check-circle",
    "lucide:badge-dollar-sign",
].map(iconName => ({icon: iconName}));

