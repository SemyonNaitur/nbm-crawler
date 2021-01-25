import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CrawlerService } from '../../services/crawler.service';

@Component({
  selector: 'app-site-selection',
  templateUrl: './site-selection.component.html',
  styleUrls: ['./site-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteSelectionComponent implements OnInit {

  @Output() siteSelected = new EventEmitter<string>();

  sites: string[] = [];
  selectedSite: string;
  loading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public crawlerService: CrawlerService
  ) { }

  ngOnInit(): void {
    this.getSitess();
  }

  getSitess() {
    this.loading = true;
    this.crawlerService.getSites().subscribe(sites => {
      this.loading = false;
      this.sites = sites;
      this.cdr.detectChanges();

      if (sites.length) this.onSelect(sites[0]);
    });
  }

  onSelect(site: string): void {
    if (this.selectedSite == site) return;
    this.selectedSite = site;
    this.siteSelected.emit(site);
  }
}
