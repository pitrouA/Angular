import { Component, OnInit } from '@angular/core';
import {PERSONS} from '../mock-person';
import {Person} from '../model/Person';

@Component({
  selector: 'app-list-name',
  templateUrl: './list-name.component.html',
  styleUrls: ['./list-name.component.css']
})

export class ListNameComponent implements OnInit {

  persons = [];
  selectedPerson: Person = this.persons[0];
  name: any;

  constructor() { }

  ngOnInit() {
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  addPerson(name: any) {
    const tmp = new Person();
    tmp.name = name;
    tmp.id = this.persons.length + 1 ;
    this.persons.push(tmp);
    this.selectedPerson = tmp;
  }
}
