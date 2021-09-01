module.exports = {

    isEmpty: function(value){
        var trimValue = value.trim();
        if(trimValue.length != 0 && trimValue != null && trimValue != "" && trimValue != undefined){
            return false;
        }
        else{
            return true;
        }
    },
}


