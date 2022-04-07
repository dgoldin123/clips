import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clips';

  constructor(public modal: ModalService, public auth: AuthService) {
    
  }

  ngOnInit(): void { }

}
