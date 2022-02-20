import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public options: Array<any> = [
    { 
      icon: 'person-add-outline', 
      text: "Teste 0"
    },
    { 
      icon: 'person-add-outline', 
      text: "Teste 1"
    }
    ,
    { 
      icon: 'person-add-outline', 
      text: "Teste 2"
    },
    { 
      icon: 'person-add-outline', 
      text: "Teste 3"
    }
  ]
  
  constructor() {}

}
