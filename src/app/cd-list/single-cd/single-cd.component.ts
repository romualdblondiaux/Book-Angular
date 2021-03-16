import { CdsService } from './../../services/cds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cd } from './../../models/cd.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-cd',
  templateUrl: './single-cd.component.html',
  styleUrls: ['./single-cd.component.css']
})
export class SingleCdComponent implements OnInit {

  cd: Cd;

  constructor(private route: ActivatedRoute, private cdsService: CdsService,
              private router: Router) {}

  ngOnInit(): void {
    this.cd = new Cd('', '');
    const id = this.route.snapshot.params['id'];
    this.cdsService.getSingleCd(+id).then(
      (cd: Cd) => {
        this.cd = cd;
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/cd']);
  }

}
