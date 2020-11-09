export interface Tag {
    pk: number;
    title: string;
}

export interface ResourceDetails {
    biosafety_level: number;
    city: string;
    email: string;
    phone_number: string;
    postal_code: string;
    street: string;
    province: string;
    website: string;
}


export interface Resource {
    pk: number;
    resource_type: string;
    tags: Tag[];
    details: ResourceDetails;
    title: string;
    color: string;
}

