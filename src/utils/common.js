import axios from 'axios'

export function fetchFileFromUrl(url, fileName) {
    return axios.get(url, { responseType: 'blob', headers : {cacheControl: "no-cache", pragma: "no-cache", expires: '0'} }).then(response => {
        return new File([response.data], fileName);
    });
}