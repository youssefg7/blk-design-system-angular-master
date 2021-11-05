import {Tournament} from './tournament.model'

export class Match {
    id: string;
    aId: string;
    bId: string;
    aName: string;
    bName: string;
    aScore: Number;
    bScore: Number;
    tournament: Tournament;
    tournamentName: string;
    date: string;
}
