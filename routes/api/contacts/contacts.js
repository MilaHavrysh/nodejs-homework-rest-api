const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require("./validations");
const {
  listContactsContr,
  getContactByIdContr,
  addContactContr,
  removeContactContr,
  updateContactContr,
  updateStatusContactContr,
} = require("../../../controllers/contacts-controllers");

router.get("/", guard, listContactsContr);

router.get("/:contactId", guard, getContactByIdContr);

router.post("/", guard, validateCreateContact, addContactContr);

router.delete("/:contactId", guard, removeContactContr);

router.put("/:contactId", guard, validateUpdateContact, updateContactContr);

router.patch(
  "/:contactId/favorite",
  guard,
  validateUpdateStatus,
  updateStatusContactContr
);

module.exports = router;
