const express = require("express");
const userController = require("../../controllers/user.controller");
const router = express.Router();
router
  .route("/random")
  /**
   * @api {get} / random user
   * @description get random user
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number{1-}} [pages=1] list page
   * @apiParam {Number{1-100}} [limit=10] User per page
   *
   * @apiSuccess {Object[]} random the user
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated user can access the data
   * @apiError (Forbidden 403) Forbidden Only admis can access the data
   */
  .get(userController.getRandomUser);
router
  .route("/all")
  /**
   * @api {get} / all user
   * @description get all user
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number{1-}} [pages=1] list page
   * @apiParam {Number{1-100}} [limit=10] User per page
   *
   * @apiSuccess {Object[]} all the user
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated user can access the data
   * @apiError (Forbidden 403) Forbidden Only admis can access the data
   */
  .get(userController.getAlluser);
/**
 * @api {post} /user save  user
 * @description post the user
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization User's access token
 *
 * @apiParam {Number{1-}} [pages=1] list page
 * @apiParam {Number{1-100}} [limit=10] User per page
 *
 * @apiSuccess {Object[]} all the user
 *
 * @apiError (Unauthorized 401) Unauthorized Only authenticated user can access the data
 * @apiError (Forbidden 403) Forbidden Only admis can access the data
 */
router.route("/save").post(userController.saveAuser);
router.route("/bulk-update").patch(userController.bulkUpdate);
router.route("/update/:id").patch(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);
module.exports = router;
