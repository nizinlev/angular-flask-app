import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './moke-heroes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})




export class HeroService {



  constructor(private massagesServers: MessagesService, private HttpClient:HttpClient) { }
 
  heroesList:any=[]

  getHero(id: number): Observable<Hero> {
    const hero= this.HttpClient.get<Hero>('http://127.0.0.1:5000/detail/'+ id.toString())
    console.log(hero)
    this.massagesServers.add('hero ID number ' + id.toString()+' is fetch')
    return hero;
  }
 
  localHeroes(): Observable<Hero[]>{
    return this.heroesList;
  }

  getHeroes(): Observable<Hero[]>{
    console.log('server on')
    const heroes= this.HttpClient.get<Hero[]>('http://127.0.0.1:5000/')
    this.heroesList=heroes
    console.log(heroes)
    this.massagesServers.add('the hero server is on')
    return this.heroesList;
  }

  updateHero(hero: Hero): Observable<Hero>{
    console.log(hero)
    return this.HttpClient.post<Hero>('http://127.0.0.1:5000/update',hero)
  }

  addHero(hero:Hero): Observable<Hero>{
    console.log('start serve')
    console.log(hero)
    return this.HttpClient.post<Hero>('http://127.0.0.1:5000/add', hero)
  }

}
