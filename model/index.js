const Contact = require("./schemas/contact");

const listContacts = async () => {
  const contactList = await Contact.find({});
  return contactList;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId });
  return contact;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body }
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
