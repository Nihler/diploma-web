import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PathsService } from '../../../common/paths.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Path } from '../../../models/path';
import { AgmMap } from '@agm/core';
import * as moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  details: Path;
  isLoading = false;
  longitude;
  latitude;
  runDate;
  runStart;
  runStop;
  timeElapsed;
  avgSpeed;
  distance;

  @ViewChild('AgmMap') agmMap: AgmMap;

  constructor(
    private pathsService: PathsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: any = this.route.params;
    this.getDetails(id.value['id']);
    // console.log(this.isLoading);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // console.log('map');
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 18,
        mapTypeId: 'terrain',
      });
      this.onMapReady(map);
    }, 300);
  }

  async getDetails(id: string) {
    this.isLoading = true;
    this.pathsService
      .getPathDetails(id)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        this.details = data;
        const middlePointIndex = Math.ceil(this.details.locations.length / 2);
        // console.log(middlePointIndex);
        this.latitude = this.details.locations[middlePointIndex].latitude;
        this.longitude = this.details.locations[middlePointIndex].longitude;
        this.distance = this.details.distance.toFixed(2);
        this.runDate = moment(this.details.runStart).format('DD-MM-YYYY');
        this.runStart = moment(this.details.runStart).format('hh:mm:ss');
        this.runStop = moment(this.details.runStop).format('hh:mm:ss');
        this.timeElapsed = moment.duration(moment(this.details.runStart).diff(this.details.runStop) * -1);
        console.log(this.timeElapsed);
        this.isLoading = false;
        // console.log(this.latitude, this.longitude);
      });
  }

  onMapReady(map): void {
    const pathLatLang = [];
    let speed = 0;
    this.details.locations.forEach((element) => {
      // console.log(element);
      pathLatLang.push(
        new google.maps.LatLng(element.latitude, element.longitude)
      );
      // pathLatLang.push({lat: element.latitude.numberDouble, lng: element.longitude.numberDouble});
      speed += element.speed;
    });
    this.avgSpeed = 0;
    // this.avgSpeed = parseFloat(speed / this.details.locations[0].locations.length).toFixed(2);
    // console.log(speed, this.avgSpeed)
    // console.log(pathLatLang);
    const myPath = new google.maps.Polyline({
      path: pathLatLang,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    myPath.setMap(map);
  }
}
