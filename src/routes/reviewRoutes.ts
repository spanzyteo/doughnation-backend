import express from 'express'
import { createReview, getAllReviews, getReview, updateReviews, deleteReviews } from '../controllers/reviewsController'
import { uploadReviewImage } from '../controllers/uploadsController'

const router = express.Router()

router.route('/reviews').post(createReview).get(getAllReviews)
router.route('/reviews/:id').get(getReview).put(updateReviews).delete(deleteReviews)
// router.route('/reviews-image').post(uploadReviewImage)

export default router