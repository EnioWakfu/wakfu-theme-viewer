export function getJson(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log(url);
        xhr.open('GET', 'https://corsanywhere.herokuapp.com/' + url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            const status = xhr.status;
            if(status === 200) return resolve(xhr.response);
            return reject(status, xhr.response);
        };
        xhr.send();
    });

}

export function getImage(url) {
    return new Promise(resolve => {
        const resultImage = new Image();
        resultImage.onload = function() {
            resolve(resultImage);
        }
        resultImage.src = url;
    })

}