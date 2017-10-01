import { Picture } from './picture'

export class Medal{
    id: number;
    name: string;
    description: string;
    ownerId: number;
    pictures: Picture[];
}