const Message = require("../models/message");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");


/**
 * Message List.
 * 
 * @returns {Object}
 */
exports.messageList = [
    async (req, res) => {
        try {
            Message.find({}).then((messages) => {
                if(messages.length > 0) {
                    return apiResponse.successResponseWithData(res, "Operation success", messages);
                } else  {
                    return apiResponse.successResponseWithData(res, "Operation", []);
                }
            });
            
        } catch {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


/**
 * Message Detail.
 * 
 * @returns {Object}
 */
exports.messageDetail = [
    async (req, res) => {
        const query = { _id: req.params.messageId };
        
        const message = await Message.find(query).then((message) => {
            if(message !== null) {
                console.log("success", message)
            } else {
                console.log("fail", message)
            }
        });
        
        return res.send(message);
    }
];


/**
 * Message Store.
 * 
 * @returns {Object}
 */
exports.messageStore = [
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
            var message = {
                text: req.query.text,
                user: req.context.me._id
            };
            
            Message.create(message).then(function(err) {
                if(err) { return apiResponse.ErrorResponse(res, err); }
                return apiResponse.successResponseWithData(res, "Message add Success", message)
            });
        }

    }
];