export const LS = {
    get: function(key){
       return JSON.parse(localStorage.getItem(key))
    },
    remove: function(key){
        localStorage.removeItem(key)
        return true
    },
    add: function(key, value){
        value = JSON.stringify(value)
        localStorage.setItem(key, value)
        return true
    }
}
