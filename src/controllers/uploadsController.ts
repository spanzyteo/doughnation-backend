import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadProjectImage = async (req: any, res: any) => {
  res.status(StatusCodes.OK).send("upload project image");
};

const uploadReviewImage = async (req: any, res: any) => {
  try {
    // Check if the file is provided
    if (!req.files || !req.files.image) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "No image file uploaded",
      });
    }

    const file = req.files.image

    // validate mime type
    if (!file.mimetype.startsWith("image")) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Only image files are allowed"
      })
    }

    //validate file size 
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Image file size must be under 2MB"
      })
    }
    
    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        use_filename: true,
        folder: "doughnation",
      }
    );
    fs.unlinkSync(file.tempFilePath);
    return res.status(StatusCodes.OK).json({ image: result.secure_url });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "An error occurred while uploading the image",
    });
  }
};

export { uploadProjectImage, uploadReviewImage };
