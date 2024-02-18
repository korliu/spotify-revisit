import useDataFetch from "@/hooks/useSpotifyDataFetch";
import { handleWaitingForData } from "@/lib/handlers";

export default function UserTopGenres() {


    const body = {
        "time_range": "medium_term",
        "limit": 20,
        "offset": 0,
      }

    const {
        data, 
        isFetched, 
        isLoading, 
        error
    } = useDataFetch("user-top-genres", "/user-top-genres", {body: body});


    type genreData = {
        "top_genres": Array<[string, number]>
        "genre_artists": Record<string,Array<string>>
    }

    const isGenresData = (data: object): data is genreData => {
        
        return (data.hasOwnProperty("top_genres")) && (data.hasOwnProperty("genre_artists"));
    }    

    if (data && isGenresData(data)) {


        const topGenres: Array<[string,number]> = data["top_genres"];
        const artistsToGenres: Record<string,string[]> = data["genre_artists"];

        

        return (
            <div className="user-top-genres"> 
                Genre Profile 
                <ul>
                    {topGenres.map( 
                        (genre: any) => {
                            return (
                                <li>
                                    {genre[0]}, {genre[1]}: {artistsToGenres[genre[0]].join(", ")}
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        )
                

    } else {
        return handleWaitingForData("user-top-genres", isFetched, isLoading, error);
    }
}