import { Component } from "@angular/core";

export interface PeriodicElement {
  name: string;
  position?: number;
  weight: number;
  extra?: boolean;
  parent?: number;
  expanded?: boolean;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = ELEMENT_DATA;

  expanded: number = null;

  expand(index: number): void {
    const comp = this.dataSource[index];
    this.expanded = comp.position === this.expanded ? null : comp.position;
    if (this.expanded !== null) {
      // TODO PUT SOME DYNAMIC DATA
      this.setData(index, {
        name: "My new sub-data",
        weight: Math.random() * 10,
        symbol: `AB-${~~(Math.random() * 100)}`
      });
    }
    this.dataSource = this.dataSource.filter(
      r => !r.extra || r.parent === this.expanded
    );
  }

  setData(index: number, obj: any): void {
    this.dataSource.splice(1 + index, 0, {
      parent: this.expanded,
      extra: true,
      position: null,
      ...obj
    });
  }
}
