import {AfterViewInit, Component} from '@angular/core';
import {Contact} from '../../share/model/contact.model';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements AfterViewInit {
  contactList = [];
  viewContactList = [];

  constructor() {
    this.contactList.push(new Contact(1, 'Rainer Winkler', 'dracheoffiziell@altschauerberg.de', 'a', ''));
    this.contactList.push(new Contact(1, 'Bryan Cranston', 'bryan@example.de', 'a', ''));
    this.contactList.push(new Contact(1, 'Aaron Paul', 'aaron@example.de', 'a', ''));
    this.contactList.push(new Contact(1, 'Bob Odenkirk', 'Bob@example.de', 'a', ''));
    this.contactList.push(new Contact(1, 'Harrison Ford', 'Harrison@example.de', 'a', ''));
    this.contactList.push(new Contact(1, 'Mark Hamill', 'Mark@example.de', 'a', ''));
    this.viewContactList = this.contactList;
  }

  ngAfterViewInit(): void {
    const search: any = document.getElementById('contactSearchInput');
    const contactSource$ = Observable.fromEvent(search, 'keyup')
      .debounceTime(250)
      .do(() => this.viewContactList = [])
      .switchMap(() => Observable.from(this.contactList))
      .filter(c => {
        if (c.name.toLowerCase().includes(search.value.toLowerCase())) {
          return c;
        }
      });
    contactSource$.subscribe((c) => this.viewContactList.push(c));
  }


}
