const BASE_URL = 'http://104.236.224.107:1337/';

export const fetchAjax = (endpoint, data, method = 'GET') => {
    const url = `${BASE_URL}${endpoint}`;
    //const url = BASE_URL+'/'+endpoint;

    if(method == 'GET'){
        return fetch(url);
    }else{
        return fetch(url, {
            method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
    }
}
