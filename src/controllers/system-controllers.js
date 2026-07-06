function ping(req, res) {
    return res.status(200).json({
        success: true,
        status: "on",
        message: "pong",
        timestamp: new Date().toISOString()
    })
}



export default {
    ping,
}