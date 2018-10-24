import { Presentateur } from "../../entities/presentateur";
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions } from '@ionic-native/contacts';
import { Injectable } from "@angular/core";

/**
 * Class ContactHandler
 * 
 * Handle contacts via Presentateur objects
 */
@Injectable()
export class ContactsHandler {

    constructor(private contacts: Contacts) {}

    /**
     * Add a presentateur to contact
     * 
     * @param presentateur Presentateur
     */
    add(presentateur: Presentateur) {
        const contact: Contact = this.contacts.create();
        const contactname = presentateur.nom.split(' ');
        contact.name = new ContactName(null, contactname[1], contactname[0]);
        contact.emails = [new ContactField('email', 'test@test.test')];
        return new Promise((res, err) => {
            contact.save().then(() => {
                res();
            }).catch(() => {
                err();
            });
        });
    }

    /**
     * Remove the presentateur from contacts
     * 
     * @param presentateur Presentateur
     */
    remove(presentateur: Presentateur) {
        // TODO
        const options = new ContactFindOptions();
        options.filter = 'test@test.test';
        options.multiple = false;

        return new Promise((res, err) => {
            this.contacts.find(['emails'], options).then((contacts: Contact[]) => {
                console.log(contacts);
                res();
            }).catch((e) => {
                err();
            });
        });
    }

    /**
     * Check if the presentateur exists
     * 
     * @param presentateur Presentateur
     */
    exists(presentateur: Presentateur) {
        // TODO
        const options = new ContactFindOptions();
        options.filter = 'test@test.test';
        options.multiple = false;

        return new Promise((res, err) => {
            this.contacts.find(['emails'], options).then((contacts: Contact[]) => {
                res(contacts.length > 0);
            }).catch((e) => {
                res(false); // TODO: res ou err ?
            });
        });
    }
}