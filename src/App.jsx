import { useState, useEffect } from "react";

import "./App.css";

import contactsData from "./contacts.json";

import ContactForm from "./contactForm/ContactForm";
import SearchBox from "./searchBox/SearchBox";
import ContactList from "./contactList/ContactList";

function App() {
  const loadContacts = () => {
    const savedContacts = window.localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : contactsData;
  };

  const saveContacts = (contacts) => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const [contacts, setContacts] = useState(loadContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="app">
        <h1>Phonebook</h1>

        <ContactForm onAdd={addContact} />
        <SearchBox value={filter} onFilter={setFilter} />
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />

        <button onClick={() => {setContacts(contactsData)}}>Initial Data Reseter</button>
      </div>
    </>
  );
}

export default App;
