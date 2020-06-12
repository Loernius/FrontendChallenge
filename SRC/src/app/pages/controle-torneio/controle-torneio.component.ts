import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'ngx-warehouse';
import { ITeamModel } from 'src/app/models/teams.models';
import { AppToastService } from 'src/app/services/toast.service';
import { shuffleArray } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { IconDefinition, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controle-torneio',
  templateUrl: './controle-torneio.component.html',
  styleUrls: ['./controle-torneio.component.scss']
})
export class ControleTorneioComponent implements OnInit {
  faArrow: IconDefinition;
  teamList: ITeamModel[] = [];
  rounds: any[] = [];
  constructor(
    private warehouse: Warehouse,
    private toastService: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.faArrow = faCaretRight;
    this.warehouse.get('teams').subscribe((teams) => {
      if (teams){ // lets get the teams from indexed db and sort them into the matches
        this.teamList = teams;
        this.prepareMatches();
      } else if (!teams || teams.length === 0){
        this.toastService.show(`You need to sign teams on the previous page before creating a tournament`, {
          classname: 'bg-warning text-light'
        });
      }
    });
  }

  prepareMatches(){
    const TEAM_LENGTH = this.teamList.length;
    if (TEAM_LENGTH !== 4) { // for a small and simple tournament
      this.toastService.show(`We currently can only run a tournament with 4 teams, sorry`, {
        classname: 'bg-warning text-light'
      });
      this.router.navigate(['']);
      return;
    }
    const teamForMatches = shuffleArray(this.teamList); //
    this.bootstrapMatches();

    let matchesIndex = 0;
    // populate the first round with teams
    teamForMatches.forEach((team) => {
      if (this.rounds[0][matchesIndex].team == null) {
        this.rounds[0][matchesIndex].team = team;
      } else {
        this.rounds[0][matchesIndex].opponent = team;
        matchesIndex += 1;
      }
    });
    this.warehouse.set('rounds', this.rounds);

  }

  bootstrapMatches(){

    // Here we are creating the template for the objects of the matches, this logic would be heavily different
    // for random number of teams on the tournament.
    const matches = [];
    for (let i = 0; i < 2; i++) {
      matches.push({
        team: null,
        opponent: null,
        winner: null
      });
    }
    const lastRound = [
      {
        team: null,
        opponent: null,
        winner: null
      }
    ];
    this.rounds.push(matches); // two matches for the first round
    this.rounds.push(lastRound); // one for the finals
  }

  selectWinner(round: number, matchIndex: number, winner: number){ // parsing though indexes because its easy to access values in arrays
    if (winner === 0) {
      this.rounds[round][matchIndex].winner = this.rounds[round][matchIndex].team;
    }else if (winner === 1) {
      this.rounds[round][matchIndex].winner = this.rounds[round][matchIndex].opponent;
    }
    if (round === 0){
      if (matchIndex % 2 === 0) {
        this.rounds[1][0].team = this.rounds[round][matchIndex].winner;
      } else {
        this.rounds[1][0].opponent = this.rounds[round][matchIndex].winner;
      }
    }
  }
  // here we have checkers for the cases where the buttons get disabled.
  // this enssures that the user dont override a previous result
  checkRound1Ended(matchIndex) {
    return !!this.rounds[0][matchIndex].winner;
  }
  checkFinalRoundEnded() {
    return !!this.rounds[1][0].winner;
  }

  checkFinalRoundStarted() {
    return !!this.rounds[1][0].team && !!this.rounds[1][0].opponent;
  }
}
