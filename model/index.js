const Contact = require("./schemas/contact");

const listContacts = async (userId, query) => {
  const {
    limit = 5,
    offset = 0,
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
  } = query;
  const optionSearch = { owner: userId };
  if (favorite !== null) {
    optionSearch.favorite = favorite;
  }
  // ЕСЛИ НЕТ ПАГИНАЦИИ
  /* const contactList = await Contact.find({ owner: userId }).populate({
   path: "owner",
   select: "email subscription",
   }); */
  const contactList = await Contact.paginate(optionSearch, {
    limit,
    offset,
    select: filter ? filter.split(" ").join(" ") : "",
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
  });
  const { docs: contacts, totalDocs: total } = contactList;
  return { contacts, total, limit, offset };
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({ path: "owner", select: "email subscription" });
  return contact;
};

const removeContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (userId, contactId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return contact;
};

const updateStatusContact = async (userId, contactId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
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
