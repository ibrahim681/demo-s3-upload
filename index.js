
const fileForm = document.querySelector("#fileForm")
const fileInput = document.querySelector("#fileInput")

fileForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = fileInput.files[0]
    console.log(file)

    const body = {
        type: file.type,
        key: file.name,
        s3method: "putObject"
    }

    // get secure url from our server
    // const { url } = await fetch("http://127.0.0.1:3001/api/note/s3", {method: "POST", body}).then(res => res.json(), err => console.log(err))
    // console.log(url)

    // post the image direclty to the s3 bucket
    await fetch("https://qjmainlessonbucket.s3.amazonaws.com/%28Chapter%2018%29%20%28Version%201%29%20%28Verses%201-30%29%20%282%29.pdf?Content-Type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUXRUTBCRUXWJMA6A%2F20240208%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240208T200243Z&X-Amz-Expires=60&X-Amz-Signature=48bd343080c777efce8179a24083d03158560d23eead8edb54310e361ec40ece&X-Amz-SignedHeaders=host", {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    // const fileUrl = url.split('?')[0]
    // console.log(fileUrl)

    // post requst to my server to store any extra data

})