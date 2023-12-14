import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'mhkx16ml',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-11-30',
    token: process.env.SANITY_SECRET_TOKEN,

})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)