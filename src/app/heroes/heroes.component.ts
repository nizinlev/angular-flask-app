import { MessagesService } from './../messages.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

heroes: Hero[]=[];
// selectedHero?:Hero;


  constructor (private router: Router,private heroService:HeroService, private messagesServicer:MessagesService) { }

  ngOnInit(): void {
    this.heroService.localHeroes().subscribe(heroes => {this.heroes = heroes});
    this.messagesServicer.add('called local')
    console.log('initial done')
  }
  
  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => {this.heroes = heroes})
    console.log("i'm on")
      
  }

  // onSelected(hero:Hero): void{
  //   this.messagesServicer.add(`this hero is chosen --- ${hero.name}`)
  //   console.log(hero)
  //   this.selectedHero=hero;
  // }

  add(hero:string):void{
    console.log('start process')
    hero=hero.trim()
    if(hero.length>=1){
      this.heroService.addHero({ hero } as unknown as Hero).subscribe(h=>{this.heroes.push(h)})
    }
    this.heroService.getHeroes().subscribe(heroes=> this.heroes=heroes)
    this.router.navigate(['/'])


  }

}
