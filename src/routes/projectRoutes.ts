import express from 'express'
import { createProject, getAllProjects, getProject, updateProject, deleteProject } from '../controllers/projectsController'
import authMiddleware from '../middleware/auth'


const router = express.Router()

router.route('/projects').post(authMiddleware, createProject).get(getAllProjects)
router.route('/projects/:id').get(getProject).put(authMiddleware, updateProject).delete(authMiddleware, deleteProject)

export default router