const path = require("path");
const fs = require("fs/promises");
const contactsPath = path.join(__dirname, "contacts.json");

const getArrayContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const arrayContacts = JSON.parse(data);
  return arrayContacts;
};
const listContacts = async () => {
  const contactList = await getArrayContacts();
  return contactList;
};
const getContactById = async (contactId) => {
  const contactList = await getArrayContacts();
  const contact = contactList.find((el) => String(el.id) === contactId);
  return contact;
};
const removeContact = async (contactId) => {
  const contactList = await getArrayContacts();
  const contact = contactList.find((el) => String(el.id) === contactId);
  const index = contactList.indexOf(contact, 0);
  contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return contact;
};
const addContact = async (id, { name, email, phone }) => {
  const newContact = { id, name, email, phone };
  const contactList = await getArrayContacts();
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};
const updateContact = async (contactId, body) => {
  const contactList = await getArrayContacts();
  const contact = contactList.find((el) => String(el.id) === contactId);
  const contactUpdate = Object.assign(contact, body);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return contact ? contactUpdate : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
