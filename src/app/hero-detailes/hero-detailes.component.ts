import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detailes',
  templateUrl: './hero-detailes.component.html',
  styleUrls: ['./hero-detailes.component.css']
})
export class HeroDetailesComponent implements OnInit {


  hero? : Hero;

  constructor(private HeroService:HeroService,private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getHero()
  }
  getHero(){
    const id = Number(this.route.snapshot.paramMap.get('_id'));
    this.HeroService.getHero(id).subscribe(x => this.hero= x)
    console.log(this.HeroService.getHero(id))
  }

  goBack(): void{ 
    this.location.back()
  }

  save(): void{
    console.log('start test')
    if(this.hero){
      this.HeroService.updateHero(this.hero).subscribe();
      this.HeroService.getHeroes().subscribe()
      this.router.navigate(['/heroes'])}
    console.log('finish save')
  }

}
