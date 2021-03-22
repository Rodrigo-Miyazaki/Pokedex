import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tfa: any = {};
  authcode: string = "";
  errorMessage: any = null;
  cols:any[] = [];

  constructor(private _loginService: LoginServiceService) {
    this.getAuthDetails();
  }

  ngOnInit() {
    this.cols = [
      {header: "Nome", field: ""},
      {header: "Geração", field: ""},
      {header: "Tipos", field: ""},
      {header: "Quantidade de ataques", field: ""},
    ]
  }

  getAuthDetails() {
    this._loginService.getAuth().subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        console.log(result);
        if (result == null) {
          this.setup();
        } else {
          this.tfa = result;
        }
      }
    });
  }

  setup() {
    this._loginService.setupAuth().subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        console.log(result);
        this.tfa = result;
      }
    });
  }

  confirm() {
    this._loginService.verifyAuth(this.authcode).subscribe((data) => {
      let result:any = {status: null,  message: null}
      result = data.body;
      if (result['status'] === 200) {
        console.log(result);
        this.errorMessage = null;
        this.tfa.secret = this.tfa.tempSecret;
        this.tfa.tempSecret = "";
      } else {
        this.errorMessage = result['message'];
      }
    });
  }

  disabledTfa() {
    this._loginService.deleteAuth().subscribe((data) => {
      const result = data.body
      if (data['status'] === 200) {
        console.log(result);
        this.authcode = "";
        this.getAuthDetails();
      }
    });
  }

}
