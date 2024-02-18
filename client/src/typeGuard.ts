


export function interfaceIs <Interface>(
    object: unknown, propertytoCheck: unknown): object is Interface{

    return propertytoCheck !== undefined;

}

export function isTopArtists(topItems: Artist[] | Track[]): topItems is Artist[]{

    return true;

}

export function isArtist(item: unknown){

    const artistItem: Artist = item as Artist;

    return artistItem.type !== undefined && artistItem.type === "artist";
}