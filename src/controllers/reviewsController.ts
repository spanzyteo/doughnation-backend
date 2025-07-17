import { StatusCodes } from "http-status-codes";
import prisma from "../prismaClient";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import isURL from "validator/lib/isURL";

const createReview = async (req: any, res: any) => {
  try {
    const { name, review } = req.body;
    if (!name || !review) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Name and review are required fields",
      });
    }

    const file = req.files?.image;

    const bodyHasImage = Object.prototype.hasOwnProperty.call(
      req.body,
      "image"
    );

    let imageUrl: string | undefined;

    if (file) {
      // ——— 1) Handle an actual upload ———
      if (!file.mimetype.startsWith("image/")) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Only image files are allowed" });
      }
      if (file.size > 2 * 1024 * 1024) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Image must be under 2MB" });
      }

      const upload = await cloudinary.uploader.upload(file.tempFilePath, {
        use_filename: true,
        folder: "doughnation",
      });
      fs.unlinkSync(file.tempFilePath);
      imageUrl = upload.secure_url;
    } else if (bodyHasImage) {
      // ——— 2) Handle an explicit URL string ———
      const candidate = (req.body.image as string).trim();
      if (
        !isURL(candidate, {
          protocols: ["http", "https"],
          require_protocol: true,
        })
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            "If you supply an image field, it must be a valid URL or file",
        });
      }
      imageUrl = candidate;
    }
    // else → no image provided at all → Prisma default will apply

    const reviewData = await prisma.review.create({
      data: {
        name,
        review,
        ...(imageUrl ? { image: imageUrl } : {}),
      },
    });

    return res.status(StatusCodes.CREATED).json(reviewData);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Error creating review",
    });
  }
};

const getAllReviews = async (req: any, res: any) => {
  try {
    const reviews = await prisma.review.findMany();
    return res.status(StatusCodes.OK).json({ data: reviews });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Error getting reviews",
    });
  }
};

const getReview = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const reviewId = await prisma.review.findUnique({
      where: { id },
    });
    if (!reviewId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Review not found",
      });
    }
    return res.status(StatusCodes.OK).json({ data: reviewId });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "An error occurred while fetching the review",
    });
  }
};

const updateReviews = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, review, image } = req.body;
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });
    if (!existingReview) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Review not found",
      });
    }
    if (!name || !review) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Name and review are required fields",
      });
    }
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        name,
        review,
        ...(image && { image }),
      },
    });
    return res.status(StatusCodes.OK).json(updatedReview);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "An error occurred while updating the review",
    });
  }
};
const deleteReviews = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });
    if (!existingReview) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Review not found",
      });
    }
    await prisma.review.delete({
      where: { id },
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Review deleted successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "An error occurred while deleting the review",
    });
  }
};

export { createReview, getAllReviews, getReview, updateReviews, deleteReviews };
