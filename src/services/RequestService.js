const Request = require("./../models/Request");
const CustomError = require("./../utils/CustomError");

class RequestService {

  async create(data, req) {
    data = {
      //This token is not necessary here. This is a protected route so just get the user_id from the request (req)
      // token: token,
      uid: data._id,
      title: data.title,
      amount: data.amount,
      isFunded: data.isFunded,
      user: req.user._id, // For relationship between User and Requests
      // email: request.email,
    };
    const request = new Request(data, req);
    const newdata = await request.save();
    return newdata;
  }

   update(id,data) {

    return Request.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
      )
  }

  delete(requestId) {
    return Request.findByIdAndRemove(requestId);
  }

  findById(requestId) {
    return Request.findById(requestId);
  }

  find(period1, period2) {
    return Request.find({$and: [{isFunded: true}, {date: {$gte: period1, $lte: period2}}]});
  }

  // @desc Get all requests
  findAll() {
    return Request.find();
  }

  // @action bug fix for buka4rill
  // @author orca
  // @desc Get all 'active' requests
  findAllActiveRequests() {
    return Request.find({ isActive: true });
  }

}

module.exports = new RequestService();
