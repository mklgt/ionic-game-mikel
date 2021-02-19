import { Component, OnInit } from '@angular/core';
import { IGame } from '../share/interfaces';
import { GamecrudService } from '../core/gamecrud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public games:any;
  gameId: string;
  gameName: string;
  gameGenre: string;
  gameCover: string;
  gameDescription: number;
  gameReleaseyear: string;
  gamePrice: number;
  
  constructor(private gamecrudService: GamecrudService, private route:
    Router) { }
  ngOnInit(): void {
    this.gamecrudService.read_Games().subscribe(data => {
      this.games = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          genre: e.payload.doc.data()['genre'],
          cover: e.payload.doc.data()['cover'],
          description: e.payload.doc.data()['description'],
          releaseyear: e.payload.doc.data()['releaseyear'],
          price: e.payload.doc.data()['price']
        };
      })
      console.log(this.games);
    });
  }
  
  gameTapped(game) {
    this.route.navigate(['details', game.id]);
  }
}