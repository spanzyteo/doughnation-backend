import { StatusCodes } from "http-status-codes";
import prisma from "../prismaClient";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createProject = async (req: any, res: any) => {
  try {
    const userId = req.user.userId
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "You must be logged in to create a project",
      })
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })
    if (!existingUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "User not found please login again"
      })
    }
    const { days, title, fundsToRaise, fundsRaised, backers, categoryId } =
      req.body;
    if (
      !days ||
      !title ||
      !fundsToRaise ||
      !fundsRaised ||
      !backers ||
      !categoryId
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required",
      });
    }

    // upload image to cloudinary and verify if it is an image
    const imageFile = req.files?.image;
    if (!imageFile || !imageFile.mimetype.startsWith("image")) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Image file is required and must be an image",
      });
    }
    if (imageFile.size > 2 * 1024 * 1024) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Image file must be under 2MB",
      });
    }
    const upload = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      use_filename: true,
      folder: "doughnation",
    });
    fs.unlinkSync(imageFile.tempFilePath);

    // Here you would save project to the database
    const projectData = await prisma.project.create({
      data: {
        days: parseInt(days),
        title,
        fundsToRaise: parseInt(fundsToRaise),
        fundsRaised: parseInt(fundsRaised),
        image: upload.secure_url,
        backers: parseInt(backers),
        category: {
          connect: { id: categoryId },
        },
        user: {
          connect: { id: req.user.userId }
        }
      },
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    });

    res.status(StatusCodes.CREATED).json({
      ...projectData,
      category: projectData.category.name
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Error occurred while creating the project",
    });
  }
};

const getAllProjects = async (req: any, res: any) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            name: true
          }
        }
      }
    });
    return res.status(StatusCodes.OK).json({
      data: projects});
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Error getting projects",
    });
  }
};

const getProject = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const projectId = await prisma.project.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            name: true
          }
        }
      }
    });
    if (!projectId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "project not found",
      });
    }
    return res.status(StatusCodes.OK).json({ data: projectId });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "An error occurred while getting project",
    });
  }
};

const updateProject = async (req: any, res: any) => {
  try {
    const userId = req.user.userId
    const { id } = req.params;
    const { days, title, fundsToRaise, fundsRaised, backers, category } =
      req.body;
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });
    if (!existingProject || existingProject.userId !== userId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Unauthorized to update this project or project not found",
      });
    }
    if (
      !days ||
      !title ||
      !fundsToRaise ||
      !fundsRaised ||
      !backers ||
      !category
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required",
      });
    }
    // upload image to cloudinary and verify if it is an image
    const imageFile = req.files?.image;
    if (!imageFile || !imageFile.mimetype.startsWith("image")) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Image file is required and must be an image",
      });
    }
    if (imageFile.size > 2 * 1024 * 1024) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Image file must be under 2MB",
      });
    }
    const upload = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      use_filename: true,
      folder: "doughnation",
    });
    fs.unlinkSync(imageFile.tempFilePath);
  
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        days: parseInt(days),
        title,
        fundsToRaise: parseInt(fundsToRaise),
        fundsRaised: parseInt(fundsRaised),
        image: upload.secure_url,
        backers: parseInt(backers),
        category: {
          connect: { id: category },
        },
      },
    });
  
    return res.status(StatusCodes.OK).send(updatedProject);
  } catch (error) {
    
  }
};

const deleteProject = async (req: any, res: any) => {
  try {
    const { id } = req.params
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })
    if (!existingProject) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Project no found"
      })
    }
    await prisma.project.delete({
      where: { id }
    })
    return res.status(StatusCodes.OK).json({ message: "Project deleted successfully"})
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "An error occurred while deleting the project"
    })
  }
};

export {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
