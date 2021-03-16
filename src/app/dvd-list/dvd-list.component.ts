import { DvdsService } from './../services/dvds.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dvd } from '../models/dvd.model';

@Component({
  selector: 'app-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.css']
})
export class DvdListComponent implements OnInit, OnDestroy {

  dvds: Dvd[];
  dvdsSubscription: Subscription;

  constructor(private dvdsService: DvdsService, private router: Router) {}

  ngOnInit(): void {
    this.dvdsSubscription = this.dvdsService.dvdSubject.subscribe(
      (dvds: Dvd[]) => {
        this.dvds = dvds;
      }
    );
    this.dvdsService.emitDvds();
  }

  onNewDvd(): void {
    this.router.navigate(['/dvds', 'new']);
  }

  onDeleteDvd(dvd: Dvd): void {
    this.dvdsService.removeDvd(dvd);
  }

  onViewDvd(id: number): void {
    this.router.navigate(['/dvds', 'view', id]);
  }

  ngOnDestroy(): void {
    this.dvdsSubscription.unsubscribe();
  }

}
