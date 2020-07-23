import {Observable} from 'rxjs'
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private http: HttpClient) {
  }

  public httpGetRequest(url : string) {
    return this.http.get(url)
      map(response => {
        return response;
      })
      //.catch(response => (Observable.throw(response)
     // ))
  }
}
