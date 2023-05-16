import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, observable, of } from 'rxjs';
import { concatMap, delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  clickEmitted = new BehaviorSubject('Select an Option');
  options = ['One', 'Two', 'Three'];
  collection = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const sou̥rce = from(["One", "Two", "Three"]);

    // mergemap
    // This method helps in preventing the data to subscribe again and again.  No need to subscribe to the data twice which is again an observable
    sou̥rce.pipe(mergeMap(data => this.getData(data))).subscribe(res => {
      this.printVal(res, 'merge')
    })

    // switchmap
    // This method helps to take only the latest value by preventing the old values. This will stop loading of unecessary data 
    sou̥rce.pipe(switchMap(data => this.getData(data))).subscribe(res => {
      this.printVal(res, 'switch')
    })

    //concatmap
    // This method helps to get the data oneby one withouth subscribing to the data which comes again as an observable
    sou̥rce.pipe(concatMap(data => this.getData(data))).subscribe(res => {
      this.printVal(res, 'concat')
    })

    this.getJson()
  }

  getData(data) {
    return of(data + "Video").pipe(delay(10000))
  }

  printVal(val, containerId) {
    let el = document.createElement('li');
    el.innerText = val;
    document.getElementById(containerId).appendChild(el)
  }

  getJson() {
    let json = this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((res: any) => {
      res.forEach(element => {
        this.collection.push(`Number : ${element.title}`)
      });
    });
    
   }
}
