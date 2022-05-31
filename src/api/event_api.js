import http from 'axios';

const server = 'http://localhost:4000/api/';

export const eventCall = async (keyword) => {
    try {
        const resp = await http.get(`${server}${keyword}`)
        return resp;
    } catch (err) {
        console.log(err)
    }
}

export const signup = async () => {
    try {
        const resp = await http.post(`${server}`)
        return resp;
    } catch (err) {
        console.log(err)
    }
}