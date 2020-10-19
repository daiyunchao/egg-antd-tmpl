import GM from './GlobalModel'
class FetchCommon {
    async post(url, data, needToken) {
        url = GM.requestHost + url;
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        if (needToken) {
            options["headers"]["Authorization"] = `Bearer ${GM.token}`;
        }
        console.log("FetchCommon options===>", options);

        let result = await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log("data==>", data);
                return data;
            });
        return result;

    }


}
export default new FetchCommon();
