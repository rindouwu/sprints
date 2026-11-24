import { z } from 'zod'

const max_preview_size = 2 * 1024 * 1024
const max_video_size = 15 * 1024 * 1024

const preview_types = ['image/png', 'image/jpeg', 'image/webp']
const video_types = ['video/mp4', 'audio/wav']

export const uploadVideoSchema = z.object({
    title: z.string().min(1, 'Введите название видео'),
    description: z.string().optional(),
    preview: z
        .instanceof(File, { message: 'Выберете файл превью' })
        .refine((file: File) => preview_types.includes(file.type), {
            message: 'Формат превью должен быть png, jpg, jpeg, webp'
        })
        .refine((file: File) => file.size <= max_preview_size, {
            message: 'Превью не должно превышать 2мб'
        }),

    video: z
        .instanceof(File, { message: 'Выберите видео' })
        .refine((file: File) => video_types.includes(file.type), {
            message: 'Формат видео должен быть mp4 или wav',
        })
        .refine((file: File) => file.size <= max_video_size, {
            message: 'Видео не должно превышать 15мб'
        }),
})