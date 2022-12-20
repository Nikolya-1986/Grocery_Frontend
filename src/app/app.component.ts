import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ConnectableObservable, ReplaySubject, Subject, interval, multicast, take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}

// https://xn--90aexm.xn--b1agwec.xn--p1ai/2019/10/rxjs-dlya-prodolzhajuschih/

// const subject = new Subject();
// console.log('Subject');
// const source1 = timer(1000, 1000).pipe(
//   take(5),
//   tap( (x) => subject.next(x) )
// ).subscribe((item) => console.log(item));
// const sub1 = subject.subscribe(x => console.log('A: ', x));
// setTimeout(() => {
//   const sub2 = subject.subscribe(x => console.log('B: ', x));
// }, 2500);

// const subject = new BehaviorSubject(42);
// console.log('BehaviorSubject');
// const source1 = timer(1000, 1000).pipe(
//     take(5),
//     tap( (x) => subject.next(x) )
// ).subscribe();
// const sub1 = subject.subscribe(x => console.log('A: ', x));
// setTimeout(() => {
//   const sub2 = subject.subscribe(x => console.log('B: ', x));
// }, 2500);

// const subject = new ReplaySubject(2);
// console.log('ReplaySubject');
// const source1 = timer(1000, 1000).pipe(
//     take(5),
//     tap( (x) => subject.next(x) )
// ).subscribe();
// const sub1 = subject.subscribe(x => console.log('A: ', x));
// setTimeout(() => {
// const sub2 = subject.subscribe(x => console.log('B: ', x));
// }, 2500);

// const subject = new AsyncSubject();
// console.log('AsyncSubject');
// const source1 = timer(1000, 1000).pipe(
//     take(5),
//     tap( (x) => subject.next(x) )
// ).subscribe();
// const sub1 = subject.subscribe(x => console.log('A: ', x));
// setTimeout(() => {
// const sub2 = subject.subscribe(x => console.log('B: ', x));
// }, 3000);
// setTimeout(() => {subject.complete();}, 4000);


// const source1 = interval(1000).pipe(
//   take(5)
// );
// const source1 = interval(1000).pipe(
//   take(5),
//   multicast(new Subject())
// ) as ConnectableObservable<number>;
// source1.connect();
// const sub1 = source1.subscribe(x => console.log('A: ', x));
// setTimeout(() => {
//   const sub2 = source1.subscribe(x => console.log('B: ', x));
// }, 2500);