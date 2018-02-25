import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-statistics-component",
  templateUrl: "./statistics-dialog.component.html",
  styleUrls: ["./statistics-dialog.component.css"]
})
export class StatisticsDialogComponent implements OnInit {

  public chartLabels: Array<string> = new Array<string>();
  public chartData: Array<number> = new Array<number>();
  public chartType: "";

  private chartOptions: any = {
    legend : {
        labels : {
          fontColor : "white"
        }
    }
  };

  constructor(
    public dialogRef: MatDialogRef<StatisticsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    this.chartLabels = this.data.chartLabels;
    this.chartData = this.data.chartData;
    this.chartType = this.data.chartType;
  }

}
