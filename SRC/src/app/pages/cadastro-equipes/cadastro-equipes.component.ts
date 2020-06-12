import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Warehouse } from 'ngx-warehouse';
import { IParticipant } from 'src/app/models/participant.model';
import { AppToastService } from 'src/app/services/toast.service';
import { ITeamModel } from 'src/app/models/teams.models';
import { faEye, IconDefinition, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-equipes',
  templateUrl: './cadastro-equipes.component.html',
  styleUrls: ['./cadastro-equipes.component.scss']
})
export class CadastroEquipesComponent implements OnInit {

  participantList: IParticipant[] = [];

  faEye: IconDefinition;
  faList: IconDefinition;
  faTrash: IconDefinition;

  newParticipant: IParticipant = {
    nick: '',
    rank: 0
  };

  newTeam: ITeamModel = {
    name: '',
    participants: []
  };

  teamList: ITeamModel[] = [];
  RankMap = [
    'Iron',
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
    'Master',
    'Grand-Mestre',
    'Challenger'
  ];

  constructor(
    private warehouse: Warehouse,
    private toastServices: AppToastService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.faEye = faEye;
    this.faList = faList;
    this.faTrash = faTrash;
    this.warehouse.get('teams').subscribe((teams) => {
      if (teams){
        this.teamList = teams;
      }else{
        this.teamList = [];
      }
    });
  }

  parseRankingName(rankingNumber: number) {
    return this.RankMap[rankingNumber];
  }

  addParticipantToTeam(){
    if (this.newParticipant.nick === ''){
      this.toastServices.show('Please, inform the participant\'s nickname', {
        classname: 'bg-danger text-light'
      });
    }else{
      this.participantList.push(this.newParticipant);
      this.newParticipant = {
        nick: '',
        rank: 0
      };
    }
    // todo: autofocus on nick input for more intuitive experience
  }

  addTeam(){
    if (this.newTeam.name === ''){
      this.toastServices.show('Please, inform a name for the team', {
        classname: 'bg-danger text-light'
      });
    }else if (this.participantList.length !== 6){
      this.toastServices.show('The team must have 5 players and 1 coach', {
        classname: 'bg-danger text-light'
      });
    }else{
      this.newTeam.participants = this.participantList;
      this.teamList.push(this.newTeam);
      this.warehouse.set('teams', this.teamList);
      this.newTeam = {
        name: '',
        participants: []
      };
      this.participantList = [];
    }
  }

  openTeamsModal(teamListModal){
    this.modalService.open(teamListModal);
  }

  deleteParticipant(index){
    this.participantList.splice(index, 1);
  }

  deleteTeam(index){
    this.teamList.splice(index, 1);
    this.warehouse.set('teams', this.teamList);
  }
  goToTournament(){
    this.router.navigate(['tournament']);
  }
}
