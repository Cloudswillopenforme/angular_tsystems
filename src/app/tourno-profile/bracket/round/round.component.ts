import { Component, Input, OnChanges } from '@angular/core';
import { IRound } from 'src/app/core/models/IRound';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnChanges {

  @Input() round: IRound;
  @Input() roundType: string;
  @Input() isEditingDisabled: boolean;

  constructor() { }

  ngOnChanges() {
      this.defineNextRoundCandidates(this.round);
  }

  defineNextRoundCandidates(round: IRound): void {

    const newNextRoundCandidates: string[]  = [];

    for (const game of round.games) {
      newNextRoundCandidates.push(game.gameWinner);
    }

    round.nextRoundCandidates = newNextRoundCandidates;
  }

}
