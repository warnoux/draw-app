import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private socket: any;
  matrice: Array<number>;
  public ngOnInit() {
    this.socket = io("http://localhost:3000");
    this.socket.emit("init");
  }
  public ngAfterViewInit() {
    this.socket.on("matrice", data => {
      this.matrice = data;
    });
  }

  changeColor(col){
    if ( col.color != "rgb(255,255,255)" && !col.selectedColor)
      this.socket.emit("changeColor", col);
  }
}
