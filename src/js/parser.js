import { renderForm } from './form.js'

const jsonFile = document.getElementById('json')
const upload = document.querySelector('.upload')

function showUploadError(message) {
    const oldError = upload.querySelector('.upload__error')

    if(oldError) {
        oldError.remove()
    }

    const errorElement = document.createElement('p')
    errorElement.textContent = message
    errorElement.classList.add('upload__error')
    upload.append(errorElement)
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

        renderForm(json)
    })
    reader.readAsText(file)
})