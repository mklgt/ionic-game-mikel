import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamedbService } from '../core/gamedbservice.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IGame } from '../share/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  public game: IGame;
  gameForm: FormGroup;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private gamedbService: GamedbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.gamedbService.getItem(this.id).then(
      (data: IGame) => this.game = data
    );
    this.gameForm = new FormGroup({
      name: new FormControl(''),
      genre: new FormControl(''),
      releaseyear: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar juego',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveGame();
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
  saveGame() {
    
    this.gamedbService.setItem(this.game.id, this.game);
    console.warn(this.game);
  }

}
