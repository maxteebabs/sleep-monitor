export type Profile = {
    name: string;
    gender: GenderEnum;
    durations: Array<Duration>
}

export type Duration = {
    sleepTimeDuration: number;
    date: string;
}

export enum GenderEnum {
    Default = "",
    Male = "Male",
    Female = "Female"
}

export type ProfileErrors = {
    name: string;
    gender: string;
    durations: Array<DurationErrors>
}

export type DurationErrors = {
    sleepTimeDuration: string;
    date: string;
    index: -1;
}

export type QueryOption = {days: number, order: 'desc' | 'asc'} | null