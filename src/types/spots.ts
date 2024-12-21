import { User } from "./users";

export type SpotAttachment = {
    id: string;
    file_path: string;
    file_type: string;
    url: string;
}

export enum SpotType {
    RESTAURANT = 'restaurant',
	HOTEL = 'hotel',
	MALL = 'mall',
	PARK = 'park',
	MUSEUM = 'museum',
	THEATER = 'theater',
	MONUMENT = 'monument',
	BEACH = 'beach',
	UNIVERSITY = 'university',
	LIBRARY = 'library',
	AIRPORT = 'airpot',
	TRAIN_STATION = 'train station',
	STADIUM = 'stadium',
	CHURCH = 'church',
	AQUARIUM = 'aquarium',
	ISLAND = 'island',
	OTHER = 'other',
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