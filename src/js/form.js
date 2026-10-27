const formWrapper = document.querySelector('.form-wrapper')

export function renderForm(json) {
    const form = document.createElement('form')
    form.addEventListener('submit', (e) => handleFormSubmit(e, form))
    formWrapper.innerHTML = ''
    formWrapper.append(form)

    if(json.name) { createTitle(json.name, form) }

    const fields = json.fields || []
    const references = json.references || []
    const buttons = json.buttons || []

    createInput(fields, form)
    createReferences(references, form)
    createButton(buttons, form)
}

function handleFormSubmit(e, form) {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    form.querySelectorAll('select[multiple]').forEach(select => {
        data[select.name] = Array.from(select.selectedOptions).map(option => option.value)
    })
    console.log(data)
    alert('Форма отправлена, обьект выведен в консоль')
}

function applyMask(value, mask) {
    let digits = value.replace(/\D/g, '')
    if(mask.startsWith('+7') && digits.startsWith('7')) {
        digits = digits.slice(1)
    }
    let result = ''
    let digitIndex = 0
    for(let i = 0; i < mask.length; i++) {
        if(mask[i] === '9') {
            if(digitIndex >= digits.length) break

            result += digits[digitIndex]
            digitIndex++
        } else {
            if(digitIndex >= digits.length) break

            result += mask[i]
        }
    }
    return result
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

        if(field.input.mask) {
            const mask = field.input.mask
            input.addEventListener('input', () => {
                input.value = applyMask(input.value, mask)
            })
        }
        if(field.label) {
            label.prepend(field.label + ' ')
        }
        if(field.input.type && field.input.type !== 'textarea' && field.input.type !== 'technology') input.type = field.input.mask ? 'text' : field.input.type
        if(field.input.placeholder) input.placeholder = field.input.placeholder
        if(field.input.required) input.required = field.input.required
        if(field.input.checked !== undefined) input.checked = field.input.checked

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
        let withoutRef

        if(reference.input) {
            const input = document.createElement('input')
            input.type = reference.input.type
            input.name = `reference${references.indexOf(reference) + 1}`

            if(reference.input.required) input.required = true
            if(reference.input.checked !== undefined) input.checked = reference.input.checked

            if(reference.label) {
                label.append(reference.label + ' ')
            }

            label.append(input)
            form.append(label)
        }
        if(reference.text_without_ref) {
            withoutRef = document.createElement('span')
            withoutRef.textContent = reference.text_without_ref + ' '
            form.append(withoutRef)
        }
        if(reference.ref && reference.text) {
            const ref = document.createElement('a')
            ref.textContent = reference.text
            ref.href = reference.ref

            if(withoutRef) {
                ref.style.marginLeft = '4px'
                withoutRef.append(ref)
            } else {
                form.append(ref)
            }
        } else if(reference.text) {
            const text = reference.text
            form.append(text)
        }
    })
}