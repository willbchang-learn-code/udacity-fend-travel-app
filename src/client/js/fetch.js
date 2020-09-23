export async function postData(url = '', data = {}) {
    const option = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url, option);

    try {
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}
