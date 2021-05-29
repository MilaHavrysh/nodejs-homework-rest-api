const Contacts = require("../model/index");

const listContactsContr = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contacts, total, limit, offset } = await Contacts.listContacts(
      userId,
      req.query
    );
    return res
      .status(200)
      .json({
        status: "success",
        code: 200,
        data: { total, contacts, limit, offset },
      });
  } catch (error) {
    next(error);
  }
};

const getContactByIdContr = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(req.params.contactId, userId);
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
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContactContr = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
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
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      userId,
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
    const userId = req.user.id;
    const contact = await Contacts.updateStatusContact(
      userId,
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
