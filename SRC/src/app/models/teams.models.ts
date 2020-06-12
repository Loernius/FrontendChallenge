import { IParticipant } from './participant.model';

export interface ITeamModel {
  name: string;
  participants: Array<IParticipant>;
}
