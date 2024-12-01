import { User } from "./users";

export type Like = {
    id: string;
    user: User;
    subject: string;
    created_at: string;
};