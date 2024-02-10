
const fileForm = document.querySelector("#fileForm")
const fileInput = document.querySelector("#fileInput")

fileForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = fileInput.files[0]
    console.log(file)

    // Example POST method implementation:
    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    postData("http://127.0.0.1:3001/api/note/s3", {
        type: file.type,
        key: file.name,
        s3method: "putObject"
    }).then(async (data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        await fetch(data.url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file
        })
    });

    setTimeout(()=> console.log("waiting..."), 5000)

    // upload success??
    postData("http://127.0.0.1:3001/api/note", {
        bucketName: "qjmainlessonbucket",
        key: file.name,
        data: {
            fileName: file.name,
            fileSize: file.size,
            url: `https://qjmainlessonbucket.s3.amazonaws.com/${file.name}`,
            dateModified: new Date(),
        }
    }).then(async (data) => {
        console.log(data);
    });
})