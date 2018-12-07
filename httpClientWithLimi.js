// function customFetch(url: string): Promise;
//
// function httpClientWithLimit([link1, link2, ...otherLinks], limit: number) {
// } // Promise(res)

function customFetch(url) {
    if (url === 'http:/3') {
        return new Promise(resolve => setTimeout(() => {resolve(url)}, 2000));
    }
    if (typeof url === 'string') {
        return new Promise(resolve => setTimeout(() => {resolve(url)}, 1000));
    }
}

function httpClientWithLimit(links, limit) {
    return new Promise((resolve, reject) => {
        const results = [];
        let resolved = 0;

        function checkResolving() {
            resolved++;
            if (resolved === links.length) {
                resolve(results);
            }
        }

        for (let i = 0; i < links.length; i++) {
            (function(i) {
                customFetch(links[i])
                    .then(result => {
                        if (!results[Math.floor(i / limit)]) {
                            results[Math.floor(i / limit)] = [];
                        }

                        results[Math.floor(i / limit)][i % limit] = result;

                        checkResolving();
                    })
                    .catch(() => {reject()});
            })(i);
        }
    })
}
const links = ['http:/1', 'http:/2', 'http:/3', 'http:/4', 'http:/5', 'http:/1', 'http:/2', 'http:/3'];

const resLinks = httpClientWithLimit(links, 3);

resLinks.then(res => console.log(res));


