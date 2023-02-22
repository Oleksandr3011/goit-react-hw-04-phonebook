import { useState } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useLCS } from './hooks/useLCS';

const initial = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const LOCAL_CONTACTS_KEY = 'contactsKey';
export const App = () => {
    const [contacts, setContacts] = useLCS(LOCAL_CONTACTS_KEY, initial);
    const [filter, setFilter] = useState('');

    function handleAddContact(newContact) {
        if (
        contacts.some(
            contact =>
            contact.name.toLowerCase().trim() ===
                newContact.name.toLowerCase().trim() ||
            contact.number.trim() === newContact.number.trim()
        )
        ) {
        return alert(`${newContact.name} already exists`);
        }
        setContacts(prev => [...prev, newContact]);
    }

    const handleDeleteContact = id => {
        setContacts(prev => prev.filter(contact => contact.id !== id));
    };
    const handleFilter = ({ target }) => {
        setFilter(target.value);
    };
    const handleFilteredContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        console.log(contacts);
        const result = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(normalizedFilter);
        });
        return result;
    };

    return (
        <div style={{ margin: '30px' }}>
        <h1 style={{ paddingBottom: '30px' }}>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />
        <h2 style={{ paddingBottom: '30px' }}>Contacts</h2>
        <Filter filter={filter} onChange={handleFilter} />
        <ContactList
            contacts={handleFilteredContacts()}
            onDeleteContact={handleDeleteContact}
        />
        </div>
    );
};


