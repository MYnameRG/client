import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { OAuthService } from '../../services/oauth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-integrate',
  standalone: false,
  templateUrl: './integrate.component.html',
  styleUrl: './integrate.component.scss'
})
export class IntegrateComponent {
  currentUrl: any = '';
  userId: any = '';
  isConnected: boolean = false;
  routerSubscription: Subscription | undefined;
  showSpinner: boolean = false;

  constructor(
    private OAuthService: OAuthService,
    private cookieService: CookieService,
    private appComponent: AppComponent,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appComponent.checkUrl = window.location.pathname;
    const user_id = this.cookieService.get('user_id');
    if (user_id != null && user_id != '') {
      this.userId = user_id.slice(2).replace(/"/g, "");
      this.fetchAllGithubData(this.userId);
    }
  }

  onClickConnectBtn() {
    this.OAuthService.authenticate().subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        window.location.href = response.data;
      } else {
        console.log(response.data.msg);
      }
    });
  }

  onRemoveConnectBtn() {
    this.OAuthService.remove(this.userId).subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        this.isConnected = false;
        this.appComponent.isConnected = this.isConnected;
        this.cookieService.deleteAll();
        this.cdr.markForCheck();
      } else {
        console.log(response.data.msg);
      }
    });
  }

  fetchAllGithubData(user_id: string) {
    this.showSpinner = true;
    this.OAuthService.fetchAllGithubData(user_id).subscribe((response) => {
      if (response != null && response.isSuccess == true) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }

      this.showSpinner = false;
      this.appComponent.isConnected = this.isConnected;
    });
  }
}
