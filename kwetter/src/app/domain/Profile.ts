import {Group} from '../domain/Group'

export class Profile {
    id: string
    username: string
    website: string
    bio: string
    hexColor: string
    groups: Array<Group>
}