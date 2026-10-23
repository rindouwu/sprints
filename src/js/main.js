const formWrapper = document.querySelector('.form-wrapper')
const jsonFile = document.getElementById('json')

function createTitle(titleText) {
    const title = document.createElement('h2')
    title.textContent = titleText
    formWrapper.append(title)
}
function createInput(fields) {
    fields.forEach(field => {
        const label = document.createElement('label')
        const input = document.createElement('input')

        if(field.label) label.textContent = field.label
        if(field.input.type) input.type = field.input.type
        if(field.input.placeholder) input.placeholder = field.input.placeholder
        if(field.input.required) input.required = field.input.required
        label.append(input)
        formWrapper.append(label)
    })
}
function createReferences(references) {
    references.forEach(reference => {
        if(reference.input) {
            const input = document.createElement('input')
            const label = document.createElement('label')

            input.type = reference.input.type

            if(reference.input.required) input.required = true
            if(reference.input.checked) input.checked = true
            label.append(input)

            if(reference.text && !reference.ref) {
                label.append(reference.text)
            }
            formWrapper.append(label)
        }
        if(reference.ref && reference.text) {
            const ref = document.createElement('a')
            if(reference.text_without_ref) {
                const withoutRef = document.createElement('p')
                withoutRef.textContent = reference.text_without_ref
                formWrapper.append(withoutRef)
            }
            ref.textContent = reference.text
            ref.href = reference.ref
            formWrapper.append(ref)
        }
    })
}

jsonFile.addEventListener('change', () => {
    const file = jsonFile.files[0]
    if(!file) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
        const json = JSON.parse(reader.result)
        console.log(json)

        if(json.name) { createTitle(json.name) }

        const fields = Array.from(json.fields)
        const references = Array.from(json.references)
        createInput(fields)
        createReferences(references)

    })
    reader.readAsText(file)
})