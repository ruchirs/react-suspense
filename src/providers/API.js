import axios from 'axios'

export const fetchData = () => {
    const userPromise = fetchUser();
    return {
        user: wrapPromise(userPromise)
    }
}

const wrapPromise = (promise) => {
    // initialize status
    let currentStatus = 'pending'

    //set response
    let result;

    //check for promise status
    let suspender = promise.then(
        res => {
            currentStatus = 'success';
            result = res;
        },
        err => {
            currentStatus = 'error';
            result = err;
        }
    )

    return {
        read() {
            if (currentStatus === 'pending') {
                // if the promise is not completed yet.
                throw suspender;
            } else if (currentStatus === 'error') {
                // if the promise returned an error
                throw result;
            } else if (currentStatus === 'success') {
                // if the promise completed successfully
                return result;
            }
        }
    }
}

const fetchUser = () => {
    console.log('fetching users')
    return axios
        .get ('https://jsonplaceholder.typicode.com/users/2')
        .then(res => res.data)
        .catch(err => console.log('err', err))
}