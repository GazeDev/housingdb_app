import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
   providedIn: 'root'
})
export class HeadService {
  private siteTitle: string;
  private pageTitle: string;

  constructor(
    private title: Title,
    @Inject(DOCUMENT) private doc,
  ) {

  }

  setSiteTitle(title: string) {
    this.siteTitle = title;
    let headTitle;
    if (this.pageTitle) {
      headTitle = `${this.pageTitle} | ${this.siteTitle}`;
    } else {
      headTitle = `${this.siteTitle}`;
    }
    this.title.setTitle(headTitle);
  }

  setPageTitle(title: string) {
    this.pageTitle = title;
    if (!this.siteTitle) {
      this.siteTitle = this.title.getTitle();
    }
    let headTitle;
    if (this.pageTitle) {
      headTitle = `${this.pageTitle} | ${this.siteTitle}`;
    } else {
      headTitle = `${this.siteTitle}`;
    }
    this.title.setTitle(headTitle);
  }

  getTitle() {
    return this.title.getTitle();
  }

  setManifest(href) {
    // link[rel=manifest].href
    let manifest = this.doc.querySelector('link[rel=manifest]');
    manifest.href = href;
    manifest.disabled = false;
  }

  setFavicon(href) {
    // link[rel=icon].href
    let favicon = this.doc.querySelector('link[rel=icon]');
    favicon.href = href;
  }

  setCustomStylesheet(href) {
    let stylesLink = this.doc.querySelector('link#customStyles');
    stylesLink.href = href;
    stylesLink.disabled = false;
  }

  createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
  }
}
