import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
public usuario='';
public rolUsuario='';

 constructor(private UserAuthService:UserAuthService){}


 ngOnInit(): void {
  this.UserAuthService.estadoLogObservable().subscribe((user) => {
    if (user) {
      this.usuario = user.email;
    } else {
      // Usuario no autenticado
      this.usuario = '';
    }
  });
}

 

}
