const jsonFile = document.getElementById('json')

jsonFile.addEventListener('change', () => {
    const file = jsonFile.files[0]
    if(!file) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
        const json = JSON.parse(reader.result)
        console.log(json)
    })
    reader.readAsText(file)
})