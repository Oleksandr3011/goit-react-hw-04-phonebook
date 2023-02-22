import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

import  css  from './ContactForm.module.css';


export const ContactForm = ({ onAddContact }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const actions = {
        name: setName,
        number: setNumber,
    };

    const handleChange = e => {
        const { name, value } = e.target;
        actions[name](value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        onAddContact({ name, number, id: nanoid() });
        handleReset();
    };

    const handleReset = () => {
        setName('');
        setNumber('');
        // console.log(Object.value(actions));
        // Object.values(actions).map(item => item(''));
    };

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    return (
        <form className={css.form} action="" onSubmit={handleSubmit}>
            <label htmlFor={nameInputId} className={css.formLabel}>Name</label>
            <input
                id={nameInputId}
                onChange={handleChange}
                name="name"
                value={name}
                type="text"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                className={css.formInput}
            />
            <label htmlFor={numberInputId} className={css.formLabel}>Number</label>
            <input
                id={numberInputId}
                onChange={handleChange}
                name="number"
                value={number}
                type="tel"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                className={css.formInput}
            />
            <button className={css.formButton} type="submit">Add contact</button>
        </form>
    );
};

export default ContactForm;

ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
}


