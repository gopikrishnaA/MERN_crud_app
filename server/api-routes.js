// api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});
// Import contact controller
var jokeController = require("./controllers/jokeController");
var commentController = require("./controllers/commentController");
// Contact routes

router
  .route("/jokes")
  .get(jokeController.index)
  .post(jokeController.new);
router
  .route("/jokes/:joke_id")
  .get(jokeController.view)
  .put(jokeController.update)
  .delete(jokeController.delete);
router.route("/jokes/delete").post(jokeController.deleteSelected);
router.route("/jokes/comments").post(commentController.getComments);
router.route("/jokes/addComment").post(commentController.createComment);
router.route("/jokes/deleteComment").post(commentController.deleteComment);

// Export API routes
module.exports = router;
