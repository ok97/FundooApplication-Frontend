import { Component, OnInit, Input, HostListener, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
//import { Console } from 'node:console';
import { NotesService } from 'src/app/services/NotesService/notes.service';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss']
})
export class NoteDisplayComponent implements OnInit {

 

  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() moreEvent = new EventEmitter<boolean>();
  noteclick: boolean = false;
  @Input() childMessage: any | undefined;
  @ViewChild('moremenu') element!: ElementRef;
  top: number = 0;
  left : number = 0;
  more : boolean = false;

  @Input() Allnotes: any
  
 
  
  constructor(elRef:ElementRef, private noteService:NotesService) { }

  move($event: any) {
    this.more = !this.more;
    this.moreEvent.emit(this.childMessage['noteID']);
  }

   @HostListener('click', ['$event'])
   noteClick(){
   }
   sendMessage() {
    this.messageEvent.emit(this.childMessage)
  }
  updateNoteProcess(){
    this.sendMessage();
  }



  Delete(){
    // this.noteId = this.noteService.getId();
    // console.log("---->",this.noteId);

    console.log("Array->",this.Allnotes);
    

    let deletereq={
     
      noteId : this.Allnotes.map(({ notesId } : any) => notesId)
     //notesId:this.Allnotes['notesId']   
      

    }
    console.log("------------->",deletereq.noteId[0])

    this.noteService.deleteNote(deletereq.noteId[0]).subscribe(
      (response: any) => {
       console.log(response)
    // this.loadActiveNotes();
    });
   }

  
  ngOnInit(): void {
    
  }
}

