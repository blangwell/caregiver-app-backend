module.exports.getProfile = (req, res, next) => {
  try {
    // as long as the user's session is valid (which it should be if theyre accessing this route)
    // we don't need to query the database to retrieve profile info. the user is already stored in req.user 
    // since clients and charts are both embedded into the user schema,
    // for read operations we have all of the information needed in req.user with no additional database operations.
    return res.send(req.user);
  } catch (err) {
    console.log(err);
  }
};