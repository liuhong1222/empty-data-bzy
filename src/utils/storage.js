export const ls = {
  set: (key, value) => {
    localStorage.setItem(key, value)
  },
  get: (key) => {
    return localStorage.getItem(key)
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
}

export const ss = {
  set: (key, value) => {
    sessionStorage.setItem(key, value)
  },
  get: (key) => {
    return sessionStorage.getItem(key)
  },
  remove: (key) => {
    sessionStorage.removeItem(key)
  }
}
