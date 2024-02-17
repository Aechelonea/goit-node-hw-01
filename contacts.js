const fs = require("fs").promises;
const path = require("path");
const { nanoid } = await import('nanoid');

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Wczytanie kontaktów z pliku
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.error("Problem z odczytaniem pliku kontaktów:", error);
  }
}

// Pobieranie kontaktu po id
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
  } catch (error) {
    console.error("Problem z pobieraniem kontaktu:", error);
  }
}

// Usuwanie kontaktu
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.log(`Kontakt o id: ${contactId} został usunięty.`);
  } catch (error) {
    console.error("Problem z update'em kontaktu:", error);
  }
}

// Dodawanie nowego kontaktu
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Nowy kontakt dodany:", newContact);
  } catch (error) {
    console.error("Problem przy tworzeniu kontaktu:", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
