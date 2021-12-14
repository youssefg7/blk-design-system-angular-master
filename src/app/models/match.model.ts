export interface Match {
    id?: string;
    aId: string;
    bId: string;
    tournamentId: string;
    date: string;
    aScore: string;
    bScore: string;
    scorersId? : string[];
    doc?: any;
  }