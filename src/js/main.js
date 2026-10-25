const formWrapper = document.querySelector('.form-wrapper')
const jsonFile = document.getElementById('json')
const upload = document.querySelector('.upload')

function showUploadError(message) {
    const upload = document.querySelector('.upload')
    const oldError = document.querySelector('.upload__error')

    if(oldError) {
        oldError.remove()
    }

    const errorElement = document.createElement('p')
    errorElement.textContent = message
    errorElement.classList.add('upload__error')
    upload.append(errorElement)
}
function createTitle(titleText, form) {
    const title = document.createElement('h2')
    title.textContent = titleText
    form.append(title)
}
function createInput(fields, form) {
    fields.forEach(field => {
        const label = document.createElement('label')
        let input
        if(field.input.type === 'textarea') {
            input = document.createElement('textarea')
        } else if(field.input.type === 'technology') {
            input = document.createElement('select')

            if(field.input.multiple) {
                input.multiple = true
            }
            field.input.technologies.forEach(tech => {
                const option = document.createElement('option')
                option.value = tech
                option.textContent = tech
                input.append(option)
            })
        } else {
            input = document.createElement('input')
        }

        input.name = (field.label || field.input.placeholder || `field${fields.indexOf(field) + 1}`).toLowerCase()

        if(field.label) {
            label.prepend(field.label + ' ')
        }
        if(field.input.type && field.input.type !== 'textarea' && field.input.type !== 'technology') input.type = field.input.type
        if(field.input.placeholder) input.placeholder = field.input.placeholder
        if(field.input.required) input.required = field.input.required

        if(field.input.type === 'color' && field.input.colors) {
            field.input.colors.forEach((color) => {
                const colorOption = document.createElement('button')
                colorOption.type = 'button'
                colorOption.style.width = '24px'
                colorOption.style.height = '24px'
                colorOption.style.borderRadius = '50%'
                colorOption.style.backgroundColor = color
                colorOption.style.border = 'none'
                colorOption.style.margin = '4px'
                colorOption.title = color

                colorOption.addEventListener('click', () => {
                    input.value = color
                })

                label.append(colorOption)
            })
        }

        label.append(input)
        form.append(label)
    })
}
function createButton(buttons, form) {
    buttons.forEach((button, index) => {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = button.text
        buttonElement.type = index === 0 ? 'submit' : 'button'
        form.append(buttonElement)
    })
}
function createReferences(references, form) {
    references.forEach(reference => {
        const label = document.createElement('label')

        if(reference.input) {
            const input = document.createElement('input')
            input.type = reference.input.type
            input.name = `reference${references.indexOf(reference) + 1}`

            if(reference.input.required) input.required = true
            if(reference.input.checked !== undefined) input.checked = reference.input.checked
            label.append(input)
            form.append(label)
        }
        if(reference.text_without_ref) {
            const withoutRef = document.createElement('span')
            withoutRef.textContent = reference.text_without_ref + ' '
            form.append(withoutRef)
        }
        if(reference.ref && reference.text) {
            const ref = document.createElement('a')
            ref.textContent = reference.text
            ref.href = reference.ref
            form.append(ref)
        } else if(reference.text) {
            const text = reference.text
            form.append(text)
        }
    })
}

jsonFile.addEventListener('change', () => {
    const file = jsonFile.files[0]
    if(!file) return

    if(!file.name.toLowerCase().endsWith('.json')) {
        showUploadError('Выберите файл с расширением .json')
        jsonFile.value = ''
        return
    }

    const reader = new FileReader()

    reader.addEventListener('error', () => {
        showUploadError('Не удалось прочитать файл')
        jsonFile.value = ''
    })
    reader.addEventListener('load', () => {
        let json
        try {
            json = JSON.parse(reader.result)
        } catch (error) {
            showUploadError('Файл содержит некорректный json')
            jsonFile.value = ''
            return
        }

        const oldError = upload.querySelector('.upload__error')
        if(oldError) {
            oldError.remove()
        }

        const form = document.createElement('form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const formData = new FormData(form)
            const data = Object.fromEntries(formData)

            form.querySelectorAll('select[multiple]').forEach(select => {
                data[select.name] = Array.from(select.selectedOptions).map(option => option.value)
            })
            console.log(data)
            alert('Форма отправлена')
        })
        formWrapper.innerHTML = ''
        formWrapper.append(form)

        if(json.name) { createTitle(json.name, form) }

        const fields = json.fields || []
        const references = json.references || []
        const buttons = json.buttons || []

        createInput(fields, form)
        createReferences(references, form)
        createButton(buttons, form)
    })
    reader.readAsText(file)
})