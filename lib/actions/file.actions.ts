'use server';

import { put } from '@vercel/blob';

export const uploadFile = async (formData: FormData) => {
    const file = formData.get('file') as File;
    
    if (!file) throw new Error("No file provided");

    // This runs on the SERVER, so it has access to BLOB_READ_WRITE_TOKEN
    const blob = await put(file.name, file, {
        access: 'public',
    });

    return blob.url; // This is the link you save to MongoDB
};