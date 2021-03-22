import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tfaFlag: boolean = false
  userObject:any = {
    uname: "",
    upass: ""
  }
  authcode:any;
  errorMessage: any = null
  constructor(private _loginService: LoginServiceService, private _router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.userObject)
    this._loginService.loginAuth(this.userObject).subscribe((data) => {
      this.errorMessage = null;
      console.log(data)
      let result:any = {status: null,  message: null}
      result = data.body;
      if (result['status'] === 200) {
        this._loginService.updateAuthStatus(true);
        this._loginService.updateAuthUser(this.userObject.uname);
        this._router.navigate(['/pokemon']);
      }
      if (result['status'] === 206) {
        this.tfaFlag = true;
      }
      if (result['status'] === 403) {
        this.errorMessage = result['message'];
      }
      if (result['status'] === 404) {
        this.errorMessage = result['message'];
      }
    })
  }

}
