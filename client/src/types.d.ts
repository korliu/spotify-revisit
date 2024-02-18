
interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: SpotifyImage[];
    product: string;
    type: string;
    uri: string;
}

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

interface TopArtists {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Artist[];
}


interface Artist {
    external_urls: {spotify: string};
    followers: {href: string, total: number};
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
}

interface TopTracks {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Track[];
}

interface Track{
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {isrc: string, ean: string, upc: string};
    external_urls: {spotify: string};
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: object; //TODO find out what this is
    restrictions: {reason: "market" | "product" | "explicit"};
    name: string;
    /* 0-100 */
    popularity: number;
    preview_url: string;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;

}




interface SimplifiedArtist {
    external_urls: {spotify: string};
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
}

interface Album {
    album_type: "album" | "single" | "compilation",
    total_tracks: number,
    available_markets: string[],
    external_urls: {spotify: string},
    href: string,
    id: string,
    images: SpotifyImage[],
    name: string,
    release_date: string,
    release_date_precision: "year" | "month" | "day",
    restrictions: {reason: "market" | "product" | "explicit"},
    type: "album",
    uri: string,
    artists: SimplifiedArtist[]
}
