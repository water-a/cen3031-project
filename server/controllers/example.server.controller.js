exports.get = (request, response) => {
    response.send('YOU SENT A GET REQUEST!');
    response.send('Alex was here...I guess?');
}
exports.post = (request, response) => {
    response.send('YOU SENT A POST REQUEST!');
}