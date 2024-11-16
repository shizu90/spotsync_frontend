import { Group } from "./groups";
import { Spot } from "./spots";
import { User } from "./users";

export type SpotEventParticipant = {
    user: User;
    participated_at: string;
}

export enum SpotEventStatus {
    SCHEDULED = 'scheduled',
    ONGOING = 'ongoing',
    CANCELLED = 'canceled',
    ENDED = 'ended',
}

export type SpotEvent = {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: SpotEventStatus;
    visibility: string;
    spot: Spot;
    participants: SpotEventParticipant[];
    group?: Group;
    favorited?: boolean;
    favorited_at?: string;
    total_favorites?: number;
    average_rating?: number;
    created_at: string;
    updated_at: string;
    notify_minutes: number;
};