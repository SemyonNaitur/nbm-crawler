import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CrawlerService } from 'src/app/services/crawler.service';

@Component({
  selector: 'app-links-table',
  templateUrl: './links-table.component.html',
  styleUrls: ['./links-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksTableComponent implements OnInit {

  _site: string;
  siteChanged = false;

  paths$: Observable<string[]>;
  loading = false;

  constructor(public crawlerService: CrawlerService) { }

  ngOnInit(): void { }

  @Input()
  set site(site: string) {
    if (site && site != this._site) {
      this.siteChanged = true;
      this.getLinks(site);
    }
    this._site = site;
  };

  getLinks(site: string): void {
    this.loading = true;
    this.paths$ = this.crawlerService.getLinks(site).pipe(
      tap(_ => this.loading = false),
    );
  }

}
