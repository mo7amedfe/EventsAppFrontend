import { Component } from '@angular/core';
import { MainLayoutComponent } from "./core/layout/main-layout/main-layout.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [MainLayoutComponent],
  styleUrl:'./app.component.css'
})
export class AppComponent {      
}
