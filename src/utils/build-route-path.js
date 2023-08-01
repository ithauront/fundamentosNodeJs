export function buildRoutePath(path) {
const routeParametersregex = /:([a-zA-Z]+)/g

console.log(Array.from(path.matchAll(routeParametersregex)))
}

///users/:id