import { Component, OnInit } from '@angular/core';
import { IGame } from '../share/interfaces';
import { GamedbService } from '../core/gamedbservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public games: IGame[];
  gamesinit: IGame[] = [
    {
      id: '1',
      name: 'Read Dead Redemption 2',
      genre: 'Acción-aventura western',
      releaseyear: '2018',
      cover: 'https://assets.vg247.com/current//2018/05/red_dead_redemption_2_cover_art_1.jpg',
      description: "Red Dead Redemption 2 es un videojuego de acción-aventura western, en un mundo abierto y en perspectiva de primera y tercera persona, ​ con componentes para un jugador y multijugador.​ Fue desarrollado por Rockstar Games. Es la precuela de Red Dead Redemption y el tercer juego de la saga Red Dead",
      price: 35.66
    },
    {
      id: '2',
      name: 'F1 2020',
      genre: 'Conducción',
      releaseyear: '2020',
      cover: 'https://i.redd.it/boelck35myv41.jpg',
      description: "F1® 2020 te permite crear tu equipo F1® por primera vez y correr junto a los equipos y pilotos oficiales. Alternativamente, desafía a tus amigos en la nueva pantalla dividida con opciones de carreras informales para carreras más relajadas. Compite en 22 circuitos, con contenido actual y clásico.",
      price: 49.95
    }, {
      id: '3',
      name: 'Final Fantasy 7 Remake',
      genre: 'Rol de acción',
      releaseyear: '2020',
      cover: 'https://upload.wikimedia.org/wikipedia/en/c/ce/FFVIIRemake.png',
      description: "Final Fantasy VII Remake es un juego de rol de acción de 2020 desarrollado y publicado por Square Enix. Es el primero de una serie planificada de juegos que rehacen el juego de PlayStation de 1997, Final Fantasy VII. Ambientado en la distópica metrópolis cyberpunk de Midgar, los jugadores controlan al mercenario Cloud Strife.",
      price: 29.50
    }
  ]
  constructor(private gamedbService: GamedbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.games !== undefined) {
      this.games.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.gamedbService.empty()) {
      this.gamesinit.forEach(game => {
        this.gamedbService.setItem(game.id, game);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.gamedbService.getAll().then(
      (data) => this.games = data
    );
  }
  gameTapped(game) {
    this.route.navigate(['details', game.id]);
  }
}