import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  constructor(private router:Router){}

  book: Book = history.state.response;

  backToHome(){
    this.router.navigateByUrl('/home');
  }
}
