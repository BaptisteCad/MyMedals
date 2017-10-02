import { Medal } from './medal'

export class Owner{
    id: number;
    lastname: string;
    firstname: string;
    description: string;
    gender: string;
    father: number;
    mother: number;
    medals: Medal[];
}