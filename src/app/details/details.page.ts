import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamecrudService } from '../core/gamecrud.service';
import { IGame } from '../share/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public game: IGame;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private gamecrudService: GamecrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.gamecrudService.read_Games().subscribe(data => {
      let games = data.map(e => {
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
      // tengo todos los móviles
      games.forEach(element => {
        if(element.id == this.id){
            this.game = element;
        }
      });

      console.log(this.game);
    });
  }

  editRecord(game) {
    this.router.navigate(['edit', game.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar juego',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.gamecrudService.delete_Game(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}