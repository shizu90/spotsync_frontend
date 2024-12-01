import { Like } from "@/types/likes";
import { ApiResponse } from "./api";
import { ApiService } from "./api-service";

export enum LikableSubject {
	POST = 'post',
	RATING = 'rating',
	COMMENT = 'comment',
	SPOT = 'spot',
	SPOT_FOLDER = 'spot-folder',
	SPOT_EVENT = 'spot-event',
}

interface LikeBody {
    subject: LikableSubject,
    subject_id: string,
}

export class LikeService extends ApiService {
    public constructor() {
        super();
        this._setBearerTokenToHeaders();
    }

    public async like(body: LikeBody): Promise<ApiResponse<Like>> {
        return await this.client.post('/likes', body);
    }

    public async unlike(subject: LikableSubject, subjectId: string): Promise<void> {
        await this.client.delete(`/likes/${subject}/${subjectId}`);
    }
}