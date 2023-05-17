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

  clickEmitted = new BehaviorSubject('Kannada').value;
  collection = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const sou̥rce = from(["First", "Second", "Third"]);
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

    this.getJson();
    this.promiseFunction();
    // this.weather();
  }

  getData(data) {
    return of(data + " Video").pipe(delay(1000))
  }

  printVal(val: string, containerId: string) {
    let el = document.createElement('li');
    el.innerText = val;
    document.getElementById(containerId).appendChild(el)
  }

  getJson() {
    let json = this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((res: any) => {
      res.forEach(element => {
        this.collection.push(`${element.title}`)
      });
    });
  }

  onSelected(value: string): void {
    this.clickEmitted = value;
  }

  promiseFunction() {
    let promise = new Promise((resolve, reject) => {
      if (0 == 0) {
        resolve("I am resolved")
      }
      else {
        reject("I am rejected")
      }
    });

    promise.then(value => {
      console.log("value: ", value);
    }).catch(err => {
      console.log("error: ", err);
    })
  }

  async weather() {
    let bengaluruWeather = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('29 deg')
      }, 3000);
    });

    let mangaluruWeather = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('34 deg')
      }, 5000);
    });

    console.log("Fetching Bengaluru Weather ...")
    let bengaluruW = await bengaluruWeather;
    console.log("Bengaluru weather is " + bengaluruW);
    
    console.log("Fetching Mangaluru Weather ...")
    let mangaluruW = await mangaluruWeather;
    console.log("Bengaluru weather is " + mangaluruW);
  }
}
