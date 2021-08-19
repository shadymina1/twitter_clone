const Message = require('../../Models/Message');
module.exports = sendMessage = async (receiver_id ,message ,sender_id) => {
    const msg = new Message(
        {
            receiver_id: receiver_id ,
            text : message ,
            sender_id :sender_id
        });
   const newMessage =  await msg.save();

    return {
        "data" : {
            "message" : newMessage
        },
        "message" : "Message sent successfully"
    }
}
