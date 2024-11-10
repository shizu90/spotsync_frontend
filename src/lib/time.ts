import moment from 'moment';

export function readableTime(date: string) {
    const now = moment();

    const then = moment(date);

    const diffSeconds = now.diff(then, 'seconds');
    const diffMinutes = now.diff(then, 'minutes');
    const diffHours = now.diff(then, 'hours');
    const diffDays = now.diff(then, 'days');
    const diffMonths = now.diff(then, 'months');
    const diffYears = now.diff(then, 'years');


    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffMonths < 12) return `${diffMonths} months ago`;
    return `${diffYears} years ago`;
}