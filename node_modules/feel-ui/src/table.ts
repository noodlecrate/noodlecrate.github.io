import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "angular2/core";
import { NgClass, NgIf, NgModel } from "angular2/common";
import { SortPipe } from "./pipes/sort-pipe";

@Component({
    directives: [ NgClass ],
    selector: "feel-table",
    pipes: [ SortPipe ],
    //changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<table>
                  <thead>
                     <th *ngFor="#column of columns" (click)=addSort(column.propertyName)>
                        <span>{{ column.propertyName }}</span>
                        <span [ngClass]=\"{
                                            'ascending': sortItems[0] === column.propertyName,
                                            'descending': sortItems[0] === '-' + column.propertyName,
                                            'sort-icon': true
                                          }\" ></span>
                     </th>
                  </thead>
                  <tbody>
                     <tr *ngFor="#dataItem of data | sort: sortOrder">
                        <td *ngFor="#column of columns">{{ dataItem[column.propertyName] }}</td>
                     </tr>
                  </tbody>
               </table>`
})
export class TableComponent {

   @Input() data: Array<any>;
   @Input() columns: Array<any>;
   public sortOrder: string = "something";
   public sortItems: Array<string> = [ "something" ];

   public addSort (propertyName: string) {
     if (this.sortOrder === propertyName) {
       this.sortOrder = "-" + propertyName;
     }
     else {
       this.sortOrder = propertyName;
     }

     this.sortItems[0] = this.sortOrder;
   }
 }
