import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})
export class TeamCreateComponent implements OnInit {

  shortLink : string ="https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png";
  loading: boolean = false;
  file: any = null;
  loadText = "";

  constructor(private fileService:FileService, private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  onUpload() {
    if(this.file == null){
      this.loading = true;
      this.loadText = "Please upload an image"
    }else{
      this.loadText = "Loading...";
      this.loading = true;
      //console.log(this.file);
      this.fileService.upload(this.file).subscribe(
        url => {this.shortLink = url;
          this.loading = false}
    );
    }
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(){
    console.log(this.cookieService.get('Uid'));
  }
}
