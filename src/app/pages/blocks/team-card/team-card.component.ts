import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  shortLink : string ="https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png";
  loading: boolean = false;
  file: any = null;

  constructor(private fileService:FileService) { }

  ngOnInit(): void {
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileService.upload(this.file).subscribe(
        url => {this.shortLink = url;
          this.loading = false}
    );
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

}
