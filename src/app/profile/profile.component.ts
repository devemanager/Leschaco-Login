import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import {HttpHelperService} from '../services/http-helper.service';
import { Observable } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userprofile;
  userPhoto;
  photo: any; 
   
  constructor(private authService: MsalService, private http: HttpClient, private httpService: HttpHelperService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getProfile();
    this.getUserPhoto().subscribe(photo => this.photo = photo);
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .toPromise().then(userprofile => {
        this.userprofile = userprofile;
      });
  }

  getUserPhoto(): Observable<SafeUrl> {
    this.httpService.httpGetRequest(GRAPH_ENDPOINT);
    let requestUrl =GRAPH_ENDPOINT+'/photo/$value';
    return this.http.get(requestUrl, { responseType: "blob" }).pipe(map(result => {
      let url = window.URL;
      return this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(result));
    }));
  }

}
