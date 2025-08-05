import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadToCloudinary(filePath) {
    const result = await cloudinary.uploader.upload(filePath);
    return { url: result.secure_url, public_id: result.public_id };
}

export async function removeFromCloudinary(public_id) {
    await cloudinary.uploader.destroy(public_id);
}
