import * as db from "../database/query.js";

export async function home(request, respose) {
  const { rows: allPost } = await db.getAllPost();
  console.log(request.session);
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

export function makeMember(request, response) {
  response.render("make-member");
}
