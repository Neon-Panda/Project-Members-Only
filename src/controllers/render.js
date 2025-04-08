import * as db from "../database/query.js";

export async function home(request, respose) {
  const { rows: allPost } = await db.getAllPost();
  respose.render("home", {
    allPost: allPost,
    member: request.session.passport?.user,
  });
}

export function login(request, response) {
  response.render("login");
}

export function register(request, response) {
  response.render("register");
}
