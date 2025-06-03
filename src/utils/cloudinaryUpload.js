// utils/cloudinaryUpload.js
export const uploadToCloudinary = async (file, uploadPreset = 'BaoHomNay') => {

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'BaoHomNay');

  // Xác định loại file (image/video)
  const fileType = file.type.startsWith('video') ? 'video' : 'image';

  // Endpoint upload phù hợp
  const endpoint = `https://api.cloudinary.com/v1_1/dr0idfkuw/${fileType}/upload`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.log(error)
    throw new Error(`Lỗi khi upload ${fileType} lên Cloudinary: ${error.message}`);
  }
};
