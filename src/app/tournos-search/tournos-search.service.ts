import { Injectable, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournosSearchService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  items$: Observable<any>;
  statusSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  gameSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  startAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  endAtSubject$: BehaviorSubject<string | null> = new BehaviorSubject(null);


  searchTournaments() {
    this.items$ = combineLatest(
      this.statusSubject$,
      this.gameSubject$,
      this.startAtSubject$,
      this.endAtSubject$,
    ).pipe(
      switchMap(([status, game, start, end]) =>

        this.afs.collection('tournaments', ref => {
          console.log(status, game, start, end);
          let query: firebase.firestore.Query = ref;
          if (status) { query = query.where('status', '==', status) };
          if (game) { query = query.where('game', '==', game) };
          if (start || end) {
            query = query.orderBy("name").startAt(start).endAt(end)
          };
          return query;

        }).valueChanges()
      )
    )
    return this.items$;
  }

}
