export function home(request, respose) {
  respose.render("home");
}

export function login(request, response) {
  response.render("login");
}

export function register(request, response) {
  response.render("register");
}
