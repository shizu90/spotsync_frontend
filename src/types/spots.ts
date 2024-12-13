import { User } from "./users";

export type SpotAttachment = {
    id: string;
    file_path: string;
    file_type: string;
    url: string;
}

export type Spot = {
    id: string;
    name: string;
    description: string;
    type: string;
    created_at: string;
    updated_at: string;
    address: {
        area: string;
        sub_area: string;
        country_code: string;
        latitude: number;
        longitude: number;
        locality?: string;
        street_number?: string;
        postal_code?: string;
    };
    attachments: SpotAttachment[];
    creator: User;
    distance?: number;
    visited?: boolean;
    visited_at?: string;
    favorited?: boolean;
    favorited_at?: string;
    average_rating?: number;
    total_ratings?: number;
    total_spot_events?: number;
    total_favorites?: number;
    total_events?: number;
}