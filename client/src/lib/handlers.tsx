
import { redirect } from "next/navigation";
import { HTTPError } from "./_errors";


export function handleError(error: Error){

    if (error instanceof HTTPError){
      handleHTTPError(error);
    }

}


function handleHTTPError(error: HTTPError){

    const statusCode = error.statusCode;
    const errorMessage = error.errorMessage;

    if (statusCode === 401) {
        redirect("/authentication");
    } else {
        // other errors
    }

}


export function handleWaitingForData(
  dataName: string, isFetched: boolean, isLoading: boolean, error: Error | null
){

  const divElement = function (divClassName: string, divData: any): JSX.Element{
    
    return (
      <div className={divClassName}>
        {divData}
      </div>
    )

  }



    
  if (!isFetched) {
    return <>Waiting for access token</>
  }

  if (isLoading) {
    return <>Loading, attempting to fetch {dataName}</>
  };

  if (error) {
    handleError(error);
    return <>Error fetching {dataName}</>
  };

  
}