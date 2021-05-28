const Contacts = require("../model/index");

const listContactsContr = async (req, res, next) => {
  try {
    console.log(req.user);
    const contacts = await Contacts.listContacts();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContactByIdContr = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res
        .status(201)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const addContactContr = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContactContr = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res
        .status(201)
        .json({ status: "contact deleted", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateContactContr = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: "succsess", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateStatusContactContr = async (req, res, next) => {
  try {
    const contact = await Contacts.updateStatusContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: "succsess", code: 200, data: { contact } });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContactsContr,
  getContactByIdContr,
  addContactContr,
  removeContactContr,
  updateContactContr,
  updateStatusContactContr,
};
