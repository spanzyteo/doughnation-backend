import { StatusCodes } from "http-status-codes";
import prisma from "../prismaClient";

const createCategory = async (req: any, res: any) => {
  try {
    const { name, icon } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        icon,
      },
    });
    res.status(StatusCodes.CREATED).json(category);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while creating the category",
      error: error.message,
    });
  }
};

const getCategories = async (req: any, res: any) => {
  const categories = await prisma.category.findMany();
  res.status(StatusCodes.OK).json({ data: categories });
};

const getCategory = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const categoryId = await prisma.category.findUnique({
      where: { id },
    });
    if (!categoryId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Category not found",
      });
    }
    res.status(StatusCodes.OK).json({ data: categoryId });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "An error occurred while fetching the category",
    });
  }
};

const updateCategory = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body;
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Category not found",
      });
    }
    if (!name || !icon) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Name and icon are required fields",
      });
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        icon,
      },
    });
    if (!updatedCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }
    res.status(StatusCodes.OK).send(updatedCategory);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while updating the category",
      error: error.message,
    });
  }
};

const deleteCategory = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Category not found",
      });
    }
    // check if any project exist with this category
    const projects = await prisma.project.findMany({
      where: { categoryId: id },
    });

    if (projects.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Cannot delete category, Projects are still associated with it.",
      });
    }
    await prisma.category.delete({
      where: { id },
    });
    res.status(StatusCodes.OK).json({
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while deleting the category",
      error: error.message,
    });
  }
};

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
