export interface FavoriteBreed {
    id: string;
    createdAt: string;
    note: string;
    breeds_id: string;
}

export interface DogBreed {
    id: string;
    name: string;
    description: string;
    life: {
        max: number,
        min: number
    }
}

export interface DogBreedsById {
    id: string;
    attributes: {
        name: string;
        description: string;
        life: {
            max: number,
            min: number
        }
    };
    relationships:{
        group: {
            data: {
                id: string;
                type:string;
            }
        }
    };
    memo?: string;
    type: string;
}