const router = require("express").Router();
const authenticate = require("../middlewares/authenticatorMiddleware");
const RequestCtrl = require("./../controllers/RequestController");

module.exports = () => {
  router.get("/:requestId", authenticate, RequestCtrl.findById);
  router.post("/", authenticate, RequestCtrl.create);
  router.put("/:requestId", authenticate, RequestCtrl.update);
  router.delete("/:requestId", authenticate, RequestCtrl.delete);
  // @action bug fix for buka4rill
  // @author orca
  router.get("/all-active-requests", authenticate, RequestCtrl.getActiveRequests);

  router.get("/", authenticate, RequestCtrl.getRequests);

  return router;
};
