import { Time } from "@angular/common";
import { Profile } from "./Profile";

export class Tweet {
    id: string
    text: string
    visible: boolean
    creationDate: Time
    profile: Profile
}