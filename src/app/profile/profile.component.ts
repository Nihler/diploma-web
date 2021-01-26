import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PathsService } from '../../../common/paths.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  myRoutes = [];

  constructor(private pathsService: PathsService, private router: Router) {}

  ngOnInit(): void {
    this.getPaths();
    console.log(this.myRoutes);
  }


  getPaths() {
    this.pathsService
      .getPathsList()
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        this.myRoutes = data;
        let counter =1;
        this.myRoutes.forEach(element => {
          element.runDate = moment(element.runStart).format("DD-MM-YYYY");
          element.index = counter++;
        });
      });
  }

  getDetail(item: any): void {
    // console.log(item);
    const getAddress = '/details/' + item._id;
    this.router.navigate([getAddress]);
  }
}
