class Helper {
    static baseURL(){
        return "http://api.foursquare.com/v2";  //baseURl for not using repeated perpose
    }
    static auth(){
        const keys = {
            client_id:"FBPRMR2QSMUGY1CKEQ1E4ONWGHAUBL0EKKOL2CGVFQNXWOVF", //foursquare client-id &
            client_secret:"B1PCZTMNMVZXM3GSLVUDJLW24SZX4KG1YVRIT03DXNMCS3OV", //foursquare client-password
            v:"20180323" //foursquare verison
        }
        return Object.keys(keys) //all keys into array
        .map(key=> `${key}=${keys[key]}`)
        .join("&");
    }
    static urlBuilder(urlPrams){
        if(!urlPrams){
            return ""
        }
        return Object.keys(urlPrams)
        .map(key => `${key}=${urlPrams[key]}`)
        .join("&");
        
    }
    static headers(){
        return{
            Accept:"application/json"
        }
    }
    static simpleFetch(endPoint, method, urlPrams){
        let requestData ={
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
                urlPrams
                )}`,
                requestData
                ).then(res => res.json());
    }
} 
export default class SquareAPI {
    static search(urlPrams){
        return Helper.simpleFetch("/venues/search","GET",urlPrams); //foursquare venue search
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET"); //foursquare venues fetch
    }
    static getVenuePhotos(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`,"GET"); //foursquare photo fetch
    }
}