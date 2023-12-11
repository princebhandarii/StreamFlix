const User = require("../models/UserModel");
const History = require("../models/HistoryModel");

module.exports.addToLikedMovies = async (req, res) => {
    try {
      const { email, data } = req.body;
      //const user = await await User.findOne({ email });
      const user = await User.findOne({ email });
      if (user) {
        const { likedMovies } = user;
        const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

        if (!movieAlreadyLiked) {
          await User.findByIdAndUpdate(
            user._id,
            {
              likedMovies: [...user.likedMovies, data],
            },
            { new: true }
          );
        } else return res.json({ msg: "Movie already added to the liked list." });
      } else await User.create({ email, likedMovies: [data] });
      return res.json({ msg: "Movie successfully added to liked list." });
    } catch (error) {
      return res.json({ msg: "Error adding movie to the liked list" });
    }
  };

  module.exports.getLikedMovies = async (req, res) => {
    try {
      const { email } = req.params;
     // const user = await await User.findOne({ email });
     const user = await User.findOne({ email });
      if (user) {
        return res.json({ msg: "success", movies: user.likedMovies });
      } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
      return res.json({ msg: "Error fetching movies." });
    }
  };


  module.exports.saveHistory = async (req, res) => {
    try {
      const { email, data } = req.body;
      //const user = await await User.findOne({ email });
      const user = await User.findOne({ email });

      console.log( 'User', user)
      if (user) {
        const { watchedMovies } = user;
      //  console.log(watchedMovies)
        const movieAlreadyWatched = watchedMovies != null ? watchedMovies.find(({ id }) => id === data.id) : false;
        if (!movieAlreadyWatched) {
          await User.findByIdAndUpdate(
            user._id,
            {
              watchedMovies: [...user.watchedMovies, data],
            },
            { new: true }
          );
        } else return res.json({ msg: "Movie already added to the liked list." });
      } else await User.create({ email, watchedMovies: [data] });
      return res.json({ msg: "Movie successfully added to liked list." });
    } catch (error) {
      return res.json({ msg: "Error adding movie to the liked list" });
    }
  };

  module.exports.getwatchedMovies = async (req, res) => {
    try {
      const { email } = req.params;
     
     // const user = await await User.findOne({ email });
     const user = await User.findOne({ email });
      if (user) {
        return res.json({ msg: "success", movies: user.watchedMovies });
      } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
      return res.json({ msg: "Error fetching movies." });
    }
  };

  module.exports.removeFromLikedMovies = async (req, res) => {
    try {
      const { email, movieId } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const movies = user.likedMovies;
        const movieIndex = movies.findIndex(({ id }) => id === movieId);
        //console.log('movieIndex', movieIndex)
        if (movieIndex === -1) {
          res.status(204).send({ msg: "Movie not found." });
        }else{
          movies.splice(movieIndex, 1);
          await User.findByIdAndUpdate(
            user._id,
            {
              likedMovies: movies,
            },
            { new: true }
          );
          return res.json({ msg: "Movie successfully removed.", movies });
        }
      } else {
        console.log('No user found')
      }
    } catch (error) {
      console.log('error', error)
    }
  };
