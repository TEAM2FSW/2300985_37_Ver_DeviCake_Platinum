const base_response = (data, status, msg) => {
    return {
        status, 
        data,
        message: msg
    }
}

module.exports = base_response;