import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  books: Book[] = [];
  id = '';
  newBook: Book = new Book();
  changeBook: Book = new Book();
  message: any;
  searchTerm = '';
  updateModal = 'updateBook';
  updateFlag = false;
  addFlag = false;


  constructor( private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.fetchBooks();
    this.message ;
  }


  addBookFlag(){
    this.message = '';
    this.addFlag = true;
    this.newBook = new Book();
  }

  closeAddBook(){
    this.message = '';
    this.addFlag = false
    this.newBook = new Book();
  }

  fetchBooks(){
    this.bookService.getBooks().subscribe( (response) => {
      this.message = '';
      this.id = '';
      this.books = response;
      console.log(this.books);
    },
    (error) => {
      console.error("Error occured in getBooks()");
      this.message = "Oops, something went wrong. Please try again later";
    }
    );
  }

  findBook(){
    this.bookService.searchBook(this.id).subscribe( (response) =>{
      this.message = '';
      this.books = [];
      this.books = [response];
    },
    (error) => {
      console.error("Error occured in findBook()");
      if(error.status == 404) this.message = "Book with ID: "+this.id+" is not present";
      else this.message = "Oops, something went wrong. Please try again later";
    })
  }

  filterBook(){
    if(this.searchTerm.trim() == ''){
      this.fetchBooks();
    } else{
      this.books = this.books.filter( book =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || book.author.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

  addBook(){
    console.log(Number(this.newBook.year), typeof this.newBook.author, typeof this.newBook.title);
    if(typeof this.newBook.author != "string" || typeof this.newBook.title != "string" || isNaN(Number(this.newBook.year)) || (this.newBook.year.toString().length) != 4 ) {
      alert("Please enter valid Data");
      return;
    } else if(this.checkDuplicates(this.newBook)){
      alert("Record already present");
      return;
    }
    else{
      this.bookService.addBook(this.newBook).subscribe( (response) =>{
        this.message = '';
        this.newBook;
        alert("New Record added Successfully");
        this.fetchBooks();
        this.addFlag = false;

      },
      (error) => {
        console.error("Error occured in addBook()");
        this.message = "Oops, something went wrong. Please try again later";
      })
    }
    
  }
  
  deleteBook(id: number){
    console.log(id)
    this.bookService.deleteBook(id).subscribe( (response) =>{
      alert("Record has been deleted Successfully");
      this.fetchBooks();
    },
    (error) => {
      console.error("Error occured in deleteBook()");
      this.message = "Oops, something went wrong. Please try again later";
    })
  }

  updateBook(book: any){
    this.changeBook = {...book};
    this.updateFlag = true;
  }

  toUpdateBook(){
    console.log(this.changeBook);
    if(typeof this.changeBook.author != "string" || typeof this.changeBook.title != "string" || isNaN(Number(this.changeBook.year)) || (this.changeBook.year.toString().length) != 4 ) {
      alert("Please enter valid Data");
      return;
    }
    else if(this.checkDuplicates(this.changeBook)){
      alert("Record already present");
      return;
    }
    this.bookService.updateBook(this.changeBook).subscribe( (response) =>{
      this.message = '';
      this.books = response;
      alert("Record updated Successfully");
      this.closeUpdateBook();
    },
    (error) => {
      console.error("Error occured in toUpdateBook()");
      this.message = "Oops, something went wrong. Please try again later";
    })
  }
  
  closeUpdateBook(){
    this.updateFlag = false
    this.changeBook;
  }

  sortBooks(byType: any){
    if(byType == 1){
      this.books.sort((a,b)=> a.id - b.id);
    }
    else if(byType == 2){
      this.books.sort((a,b)=> a.title.localeCompare(b.title));
    }
    else if(byType == 3){
      this.books.sort((a,b)=> a.author.localeCompare(b.author));
    }
    else if(byType == 4){
      this.books.sort((a,b)=> a.year - b.year);
    }
    else if(byType == 5){
      this.books.sort((a,b)=> b.id - a.id);
    }
    else if(byType == 6){
      this.books.sort((a,b)=> b.title.localeCompare(a.title));
    }
    else if(byType == 7){
      this.books.sort((a,b)=> b.author.localeCompare(a.author));
    }
    else if(byType == 8){
      this.books.sort((a,b)=> b.year - a.year);
    }

  }

  getBookDetails(id: any){
    this.bookService.searchBook(id).subscribe( (response) =>{
      this.message = '';
      this.router.navigate(['/details'], {state: {response}});
    },
    (error) => {
      console.error("Error occured in getBookDetails()");
      this.message = "Oops, something went wrong. Please try again later";
    })
  }

  checkDuplicates(b: any){
    return this.books.some(a => a.author == b.author && a.title == b.title && a.year == b.year);

  }

}
