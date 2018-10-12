class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2";
    }    
    static auth() {
        const keys = {
            client_id: "DQRJIJMNVX5GBIN1C4F5FJOREDG2TKEJTF5IXVYJSV41EQTW",
            client_secret: "BZPWNB5SJMCO0XYUFI3WDBC0F5AUP11VCLINDFWJFXPJBMSC",
            v: "20181006"
        };
        return Object.keys(keys)
        .map(key => `${key}=${keys[key]}`)
        .join("&");
    }   
        static urlBuilder(urlPrams) {
            if(!urlPrams) {
                return "";
            }
            return Object.keys(urlPrams)
                .map(key => `${key}= ${urlPrams[key]}`)
                .join('&');
        };
        static headers() {
            return {
                Accept: "application/json"
            };
    }
    static simpleFetch(endPoint, method, urlPrams) {
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
            requestData).then(res => res.json())
    };
  }

export default class SquareAPI {
    static search (urlPrams) {
        return Helper.simpleFetch('/venues/search', 'GET', urlPrams);
    }
    static getVenueDetails (VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET');
    }
    static getVenuePhotos (VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
    }
    static getVenueLinks (VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/links`, 'GET');
    }
}