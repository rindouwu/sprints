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
function createButton(buttons) {
    buttons.forEach((button, index) => {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = button.text
        buttonElement.type = index === 0 ? 'submit' : 'button'
        formWrapper.append(buttonElement)
    })
}
function createReferences(references) {
    references.forEach(reference => {
        let isInput = false
        const label = document.createElement('label')
        if(reference.input) {
            isInput = true
            const input = document.createElement('input')
            input.type = reference.input.type

            if(reference.input.required) input.required = true
            if(reference.input.checked) input.checked = true
            label.append(input)
        }
        if(reference.text_without_ref) {
            const withoutRef = document.createElement('span')
            withoutRef.textContent = reference.text_without_ref + ' '
            if(!isInput) {
                formWrapper.append(withoutRef)
            } else {
                label.append(withoutRef)
            }
        }
        if(reference.ref && reference.text) {
            const ref = document.createElement('a')
            ref.textContent = reference.text
            ref.href = reference.ref
            if(!isInput) {
                formWrapper.append(ref)
            } else {
                label.append(ref)
            }
        } else if(reference.text) {
            const text = reference.text
            if(!isInput) {
                formWrapper.append(text)
            } else {
                label.append(text)
            }
        }
        if(isInput) {
            formWrapper.append(label)
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

        const fields = json.fields || []
        const references = json.references || []
        const buttons = json.buttons || []

        createInput(fields)
        createReferences(references)
        createButton(buttons)
    })
    reader.readAsText(file)
})