import * as db from "../database/query.js";

export async function post(request, response) {
  const user = request.session.passport.user;
  const postText = request.body.newPost;
  try {
    await db.createPost(postText, user.userID);
    response.redirect("/");
  } catch {
    response.send(400);
  }
}
