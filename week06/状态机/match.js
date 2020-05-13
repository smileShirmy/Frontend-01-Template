function matchA(string) {
  for (let c of string) {
    if (c == 'a') {
      return true
    }
  }

  return false
}

function matchAB(string) {
  let foundA = false
  for (let c of string) {
    if (c == 'a') {
      foundA = true
    } else if (foundA && c == 'b') {
      return true
    } else {
      foundA = false
    }
  }

  return false
}

function matchABCDEF(string) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false
  let foundF = false

  for (let c of string) {
    if (c == 'a') {
      foundA = true
    } else if (foundA && c == 'b') {
      foundB = true
    } else if (foundA && c == 'c') {
      foundC = true
    } else if (foundA && c == 'd') {
      foundD = true
    } else if (foundA && c == 'e') {
      foundE = true
    } else if (foundA && c == 'f') {
      return true
    } else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
      foundF = false
    }
  }

  return false
}

matchA('i am groot')

matchAB('i amb groot')
