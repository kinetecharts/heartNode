
const Major=[0, 4, 7, 12]
const Minor=[0, 3, 7, 12]

const C = 60
const D = 62
const E = 64
const F = 65
const G = 67
const A = 69
const B = 71

let Series=function(root, kind){
    return kind.map(x=>x+root)
}
