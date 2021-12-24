export interface Match {
    id?: string;
    aId: string;
    bId: string;
    tournamentId: string;
    date: string;
    aScore: string;
    bScore: string;
    ticketPrice:number;
    ticketsLeft:number;
    scorersId : string[];
    doc?: any;
    week: number;
  }