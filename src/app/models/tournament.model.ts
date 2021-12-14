export interface Tournament {
    id?: string;
    name: string;
    userId: string;
    teamsId: string[];
    matchesId: string[];
    ticketPrice? : Number;
    ticketsLeft: Number;
    doc?: any;
  }