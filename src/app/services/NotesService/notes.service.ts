import { Injectable } from '@angular/core';
import { HttpService } from '../HttpServices/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT')); 
  options = { headers: this.headers };
  constructor(private httpService : HttpService) { }
  createNote(data: any){
    return this.httpService.post('api/Notes/AddNote', data,{ headers: this.headers })
  }
  GetActiveNotes(){

    return this.httpService.Get('api/Notes/GetNotes', this.options)
  }
  updateNote(data: any ) {
 
    return this.httpService.put('api/Notes/Update', data, this.options);
  }
  deleteNote(data: any)
  {
    return this.httpService.delete('api/Notes/Delete', data);
  }
}
