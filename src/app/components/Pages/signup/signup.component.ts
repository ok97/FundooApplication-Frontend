import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroupDirective, FormControl, NgForm, FormGroup, PatternValidator, Validators,} from '@angular/forms';
import {UserService} from '../../../services/UserServices/user.service';
import { ErrorStateMatcher, } from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {    MatSnackBarConfig} from '@angular/material/snack-bar';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !! (control && control.invalid && control.parent?.dirty);
    const invalidParent =
     !!(control && control.parent && control.parent.invalid && control.parent.dirty 
       && control.parent.hasError('notSame'));

    return (
      invalidCtrl ||
       invalidParent);
  }
} 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
 // encapsulation: ViewEncapsulation.None
})


export class SignupComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  public isActive: boolean;
  public notSame: boolean;
  registerForm:FormGroup;
  public EmailTld: string = '@gmail.com';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  
  addExtraClass: boolean = false;
  constructor(private formBuilder:FormBuilder, private userSevice:UserService,
    public snackBar: MatSnackBar) { 
    
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required
           
          ] ,), 
        lastName: new FormControl('', [Validators.required
        ],),
        email: new FormControl('', [Validators.required
        ]),
        password:  new FormControl('', [Validators.required
        ]),
        confirmPassword:  new FormControl('', [Validators.required
        ])
      },
      { validators: this.checkPasswords },
    );   
    this.isActive = true;
    this.notSame = false;
  } 
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }

  ngOnInit(): void {
    
  }
  register(){
    
    if(this.registerForm.valid){
      this.openSnackBar('Registering user...', 0);
      let reqData ={
        firstName: this.registerForm.get('firstName')?.value,
        LastName: this.registerForm.get('lastName')?.value,
        Email: this.registerForm.get('email')?.value+this.EmailTld,
        password: this.registerForm.get('password')?.value
      }
      
      this.userSevice.registerUser(reqData).subscribe(
        response => {
          console.log("register successfull", response);
          this.openSnackBar('Registration successful', 2000);      
        },
        error => {
          if(error['status'] == 0){
            this.openSnackBar('Registration failed: server offline', 2000,);
          }
          else{
            this.openSnackBar('Registration failed: '+error['error']['message'], 2000);
          }
        }
        );
    } 
  } 

  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  
 checkPasswords(group: FormGroup) {
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }
}

}