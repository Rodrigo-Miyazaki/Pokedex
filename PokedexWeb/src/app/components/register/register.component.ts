import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: any = null;
  resultMessage:any = null;
  userObject = {
    uname: "",
    upass: ""
  }
  confirmPass: string = ""

  constructor(private _loginService: LoginServiceService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    if (this.userObject.uname.trim() !== "" && this.userObject.upass.trim() !== "" && (this.userObject.upass.trim() === this.confirmPass))
      this._loginService.registerUser(this.userObject).subscribe((data) => {
        let result:any = {status: null,  message: null}
        result = data.body;
        console.log(result)
        if (result['status'] === 200) {
          this.resultMessage = result['message'];
          setTimeout(() => {
            this._router.navigate(['/login']);
          }, 2000);
        }else if (result['status'] === 400) {
          this.errorMessage = result['message'];
        }
      }, error=>{
        console.log(error)
      });
  }

}
