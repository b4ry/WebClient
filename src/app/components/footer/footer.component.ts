import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void { }

  public delegateToGithubPage(): void {
    window.open("https://github.com/b4ry");
  }
}
