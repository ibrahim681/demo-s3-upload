
const fileForm = document.querySelector("#fileForm")
const fileInput = document.querySelector("#fileInput")

fileForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = fileInput.files[0]

    // get secure url from our server
    const { url } = await fetch("http://127.0.0.1:3001/api/note/s3").then(res => res.json())
    console.log(url)

    // post the image direclty to the s3 bucket
    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const fileUrl = url.split('?')[0]
    console.log(fileUrl)

    // post requst to my server to store any extra data

})