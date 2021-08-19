const Message = require('../../Models/Message');
module.exports = getMessage = async (receiver_id ,sender_id) => {
    const msg = await Message.find(
        {
            receiver_id:receiver_id  ,
            sender_id :sender_id
        });
    return {
        "data" : {
            "message" : msg
        }
    }
}
