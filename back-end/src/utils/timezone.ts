import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


function toManausTime(date: Date | string | null | undefined): string | null {
    if (!date) return null;
    return dayjs(date).utc().tz('America/Manaus').format('YYYY-MM-DDTHH:mm:ss');
}

export function ajustaTimestampsManaus(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(ajustaTimestampsManaus);
    }
    if (obj && typeof obj === 'object') {
        const novoObj = { ...obj };
        for (const key in novoObj) {
            if (key.endsWith('_em') && novoObj[key]) {
                novoObj[key] = toManausTime(novoObj[key]);
            } else if (typeof novoObj[key] === 'object') {
                novoObj[key] = ajustaTimestampsManaus(novoObj[key]);
            }
        }
        return novoObj;
    }
    return obj;
}