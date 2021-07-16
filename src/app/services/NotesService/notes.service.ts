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

    console.log("Notes Services notesId:-",data);

    return this.httpService.delete('api/Notes/Delete/',data,{ headers: this.headers });

  }

  ArchiveNote(data:any){
    console.log("Notes Services notesId:-",data);

    return this.httpService.put('api/Notes/Archived',data,{ headers: this.headers });

  }

  // noteId : any;

  // NoteId(data:any){
     
  //   this.noteId = data;
  //   console.log("note service--->",this.noteId)
  // }

  // getId(){
  //   return this.noteId;
  // }
}
