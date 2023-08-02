export function buildRoutePath(path) {
const routeParametersregex = /:([a-zA-Z]+)/g
const pathWithParams = path.replaceAll(routeParametersregex, '(?<$1>[a-z0-9\-_]+)')

const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
return pathRegex
}

///users/:id