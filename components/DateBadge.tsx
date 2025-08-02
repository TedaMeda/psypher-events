export const DateBadge = ({ date }: {date: string}) => {
    if (!date) return null;

    const dt = new Date(date);
    const formatted = dt.toLocaleString(undefined, {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <span className="inline-block text-xs md:text-sm font-medium text-white/80 px-3 py-1 rounded-full border mx-1.5">
            {formatted}
        </span>
    );
};
