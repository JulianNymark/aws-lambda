// const fs = require('fs');
// const html = fs.readFileSync('index.html', { encoding:'utf8' });

const randomString = (length = 8) => {
    // Declare all characters
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};

const tripTypes = ["train", "bus", "plane"];
const locations = ["Bergen", "Oslo", "Trondheim", "Hønefoss"];

const selectRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const genFakeTrip = (from, to) => {
    return {
        id: randomString(), 
        estDuration: Math.random() * 90, 
        type: selectRandom(tripTypes),
        from,
        to,
    };
}

const genFakeTrips = (from, to) => {
    const numberOfTrips = Math.round(Math.random() * 5) + 1;
    
    const trips = [];
    
    for (let i=0; i < numberOfTrips; i++) {
        trips.push(genFakeTrip(from, to));
    }
    return trips;
}

exports.handler = async (event) => {
    
    
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body);
        let {from, to} = body;   
    
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: JSON.stringify(genFakeTrips(from, to)),
        };
        return response;
    }
    return { statusCode: 400, headers: {'Content-Type': 'text/html'}, body: 'POST json needs "from" and "to"'}
};
