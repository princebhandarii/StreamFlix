    const {
        addToLikedMovies,
        getLikedMovies,
        removeFromLikedMovies,
        saveHistory,
        getwatchedMovies
    } = require("../controllers/UserController");

  const router = require("express").Router();

  router.post("/add", addToLikedMovies);
  router.get("/liked/:email", getLikedMovies);
  router.put("/delete", removeFromLikedMovies);
  router.post("/add/history", saveHistory);
  router.get("/watched/:email", getwatchedMovies);

  module.exports = router;