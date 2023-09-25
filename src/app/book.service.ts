import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Book } from './book';
import { environment } from './config';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.apiUrl;

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl);
  }

  searchBook(id: any): Observable<Book> {
    return this.httpClient.get<Book>(this.baseUrl+'/'+id);
  }

  addBook(newbook: any) {
    return this.httpClient.post(this.baseUrl, newbook);
  }

  deleteBook(id: any): Observable<Book> {
    return this.httpClient.delete<Book>(this.baseUrl+'/delete/'+id);
  }

  updateBook(updateBook: any): Observable<Book[]> {
    return this.httpClient.put<Book[]>(this.baseUrl, updateBook);
  }

}
