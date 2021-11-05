import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  host: {'[style.display]': '"flex"','[style.flex-direction]': '"column"','[style.overflow]': '"auto"'}
})
export class MatchesComponent implements OnInit {
  

  constructor(public users:UsersService) { }
  
  matchList=[];
  nameFilter = "Select Team";
  tournamentFilter = "Select Tournamet";
  dateFilter = "any";


  ngOnInit(): void {
    this.matchList.push(new tsmatch("1","Zamalek","https://upload.wikimedia.org/wikipedia/ar/4/4c/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%86%D8%A7%D8%AF%D9%8A_%D8%A7%D9%84%D8%B2%D9%85%D8%A7%D9%84%D9%83_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.png","0","Ahly","https://upload.wikimedia.org/wikipedia/en/8/8c/Al_Ahly_SC_logo.png","TestTour","22/12/2022"));
    this.matchList.push(new tsmatch("1","tooooo","https://upload.wikimedia.org/wikipedia/ar/4/4c/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%86%D8%A7%D8%AF%D9%8A_%D8%A7%D9%84%D8%B2%D9%85%D8%A7%D9%84%D9%83_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.png","0","Ahly","https://upload.wikimedia.org/wikipedia/en/8/8c/Al_Ahly_SC_logo.png","TestTour","22/12/2022"));
    this.matchList.push(new tsmatch("1","Zbishk","https://upload.wikimedia.org/wikipedia/ar/4/4c/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%86%D8%A7%D8%AF%D9%8A_%D8%A7%D9%84%D8%B2%D9%85%D8%A7%D9%84%D9%83_%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A.png","0","Ahly","https://upload.wikimedia.org/wikipedia/en/8/8c/Al_Ahly_SC_logo.png","TestTour","22/12/2022"));
    this.matchList.push(new tsmatch("6","among","https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png","8","sus","https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png","BIshTour","20/2/2000"));
    this.matchList.push(new tsmatch("6","among","https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png","8","sus","https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png","BIshTour","20/2/2000"));
    this.matchList.push(new tsmatch("6","among","https://i.ibb.co/PTkS6rZ/Activity-Swimlane-5.png","8","sus","https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png","BIshTour","20/1/2000"));
    
  }

  onTeamChange(){
    var e = document.getElementById("teamSelect") as HTMLSelectElement;
    this.nameFilter = e.options[e.selectedIndex].text;
  }

  onTournamentChange(){
    var e = document.getElementById("tournamentSelect") as HTMLSelectElement;
    this.tournamentFilter = e.options[e.selectedIndex].text;
  }
  
  onDateChange(){
    var e = document.getElementById("dateSelect") as HTMLInputElement;
    console.log(formatDate(e.value,'dd/MM/yyyy','en_US'));
    this.dateFilter = formatDate(e.value,'dd/MM/yyyy','en_US');
  }

}

class tsmatch{
  aScore:string; aName:string; aPic:string; bScore:string; bName:string; bPic:string; tournamentName:string; date:string;

  constructor(aScore:string, aName:string, aPic:string, bScore:string, bName:string, bPic:string, tournamentName:string, date:string,) {
    this.aScore = aScore;
    this.aName = aName;
    this.aPic = aPic;
    this.bScore = bScore;
    this.bName = bName;
    this.bPic = bPic;
    this.tournamentName = tournamentName;
    this.date = date;
  }
}
