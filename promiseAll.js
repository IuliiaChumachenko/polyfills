Promise.all = function(promiseList){
    return new Promise(function(resolve, reject) {
        var fullfild = [];
        var countFullfild = 0;
        function checkResolving(){
            countFullfild++;
            if(countFullfild === promiseList.length) {
                resolve(fullfild);
            }
        };

        for(var i = 0; i < promiseList.length; i++){
            (function(i){
                promiseList[i]
                    .then(function (result) {
                        fullfild[i] = result;
                        checkResolving();
                    })
                    .catch(function() {reject()});
            })(i)
        }

    });
}

var promiseArr = [
    new Promise(function(resolve) {resolve(1)}),
    new Promise(function(resolve) {setTimeout(function(){resolve(2)}, 2000)}),
    new Promise(function(resolve) {resolve(3)})
];

var myProm = promiseAll(promiseArr);

myProm.then(function(res) {console.log(res)});
