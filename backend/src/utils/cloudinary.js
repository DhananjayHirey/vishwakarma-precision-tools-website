import { v2 as cloudinary } from 'cloudinary';
import fs, { access } from 'fs';
import path from 'path';
import { ApiError } from './ApiError.js';
import { ApiResponse } from './ApiResponse.js';

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET || !CLOUDINARY_CLOUD_NAME) {
    throw new ApiError('Cloudinary configuration is missing in .env file');
}


cloudinary.config({
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    cloud_name: CLOUDINARY_CLOUD_NAME
});


export const uploadToCloudinary = async (localFilePath, folder, fileName, resource_type, access_mode) => {
    if (!localFilePath) return null;

    try {
        if (!fs.existsSync(localFilePath)) {
            console.error('File does not exist locally:', localFilePath);
            return null;
        }

        console.log(`Uploading to Cloudinary: local=${localFilePath} => folder=${folder}`);

        // Public ID = folder/filename without extension
        const ext = path.extname(fileName);
        const basename = path.basename(fileName, ext);

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type,
            public_id: basename,
            folder: folder,
            unique_filename: true,
            overwrite: false,

            access_mode: access_mode || 'public',
        });

        console.log('✅ File uploaded successfully to Cloudinary:', result.secure_url);

        // Delete local after upload
        fs.unlinkSync(localFilePath);

        return result;

    } catch (error) {
        console.error(`❌ Cloudinary upload error for ${localFilePath}:`, error);
        try {
            if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        } catch (unlinkErr) {
            console.error('Error deleting local file after failure:', unlinkErr);
        }
        return null;
    }
};

function extractPublicId(url) {
    // Remove everything before `/upload/`
    const withoutPrefix = url.split("/upload/")[1];

    // Remove version number (v1762181324)
    const withoutVersion = withoutPrefix.replace(/^v\d+\//, "");

    // Remove file extension (.jpg, .png, etc.)
    return withoutVersion.replace(/\.[^/.]+$/, "");
}






export const deleteFileFromCloudinary = async (fileUrl) => {
    try {
        const publicId = extractPublicId(fileUrl);
        console.log("Extracted public_id:", publicId);
        console.log(`Deleting from Cloudinary: public_id=${publicId}`);
        if (!publicId) {
            console.error('No public_id provided for deletion');
            return null;
        }

        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'image',
        });

        console.log('✅ Deleted from Cloudinary:', result);
        return result;
    } catch (error) {
        console.error(`❌ Cloudinary deletion error:`, error);
        return null;
    }
};


export const getUrlFromCloudinaryPublicId = (publicId, resource_type = 'image') => {
    const url = cloudinary.url(publicId, {
        resource_type,
        sign_url: true,
        secure: true,
    });
    return url;
}