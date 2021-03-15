import { Router } from '@angular/router';
import { CdsService } from './../services/cds.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cd } from '../models/cd.model';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.css']
})
export class CdListComponent implements OnInit, OnDestroy {

  cds: Cd[];
  cdsSubscription: Subscription;

  constructor(private cdsService: CdsService, private router: Router) {}

  ngOnInit(): void {
    this.cdsSubscription = this.cdsService.cdSubject.subscribe(
      (cds: Cd[]) => {
        this.cds = cds;
      }
    );
    this.cdsService.emitCds();
  }

  onNewCd(): void {
    this.router.navigate(['/cds', 'new']);
  }

  onDeleteCd(cd: Cd): void {
    this.cdsService.removeCd(cd);
  }

  onViewCd(id: number): void {
    this.router.navigate(['/cds', 'view', id]);
  }

  ngOnDestroy(): void {
    this.cdsSubscription.unsubscribe();
  }

}
