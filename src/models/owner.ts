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

export class OwnerViewModel extends Owner {
    isLoaded: boolean = false;
}

export class OwnerTree extends Owner {
    motherOwner: OwnerTree;
    fatherOwner: OwnerTree;
    brothers: OwnerTree[];
    children: OwnerTree[];
    partner: OwnerTree;
}