import { Component } from '@angular/core';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: [
    './styles/tabs.page.scss'
  ]
})
export class TabsPage  {

  constructor(public menu: MenuController) { }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  ionTabsDidChange(event) {
    // console.log('ionTabsDidChange', event);
  }
}
