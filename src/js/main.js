const formWrapper = document.querySelector('.form-wrapper')
const jsonFile = document.getElementById('json')

function createTitle(titleText) {
    const title = document.createElement('h2')
    title.textContent = titleText
    formWrapper.append(title)
}

jsonFile.addEventListener('change', () => {
    const file = jsonFile.files[0]
    if(!file) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
        const json = JSON.parse(reader.result)
        console.log(json)

        if(json.name) { createTitle(json.name) }
    })
    reader.readAsText(file)
})