import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamecrudService } from '../core/gamecrud.service';
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
    private gamecrudService: GamecrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    
    this.gameForm = new FormGroup({
      name: new FormControl(''),
      genre: new FormControl(''),
      releaseyear: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
    });
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
            this.gameForm.get('name').setValue(this.game.name),
            this.gameForm.get('genre').setValue(this.game.genre),
            this.gameForm.get('cover').setValue(this.game.cover),
            this.gameForm.get('description').setValue(this.game.description),
            this.gameForm.get('releaseyear').setValue(this.game.releaseyear),
            this.gameForm.get('price').setValue(this.game.price)
        }
      });
      console.log(this.game);
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
            this.game=this.gameForm.value;
            this.gamecrudService.update_Game(this.id,this.game);
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
