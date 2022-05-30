import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, OnInit, EventEmitter, Input, PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-google-map',
  template: ''
})
export class GoogleMapComponent implements OnInit {

  @Input() mapOptions: google.maps.MapOptions;
  public _el: HTMLElement;
  public _map: google.maps.Map;
  public $mapReady: EventEmitter<any> = new EventEmitter();
  public _mapIdledOnce = false;

  constructor(
    public _elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit() {
    // there are some issues with maps in server side
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  initMap(): void {
    this._el = this._elementRef.nativeElement;
    this._map = new google.maps.Map(this._el, this.mapOptions);

    // Workarround for init method: try to catch the first idle event after the map creation
    // (this._mapIdledOnce). The following idle events don't matter.
    const _ready_listener = this._map.addListener('idle', () => {
      console.log('mapReady - IDLE');
      if (!this._mapIdledOnce) {
        this.$mapReady.emit(this._map);
        this._mapIdledOnce = true;
        // Stop listening to event, the map is ready
        google.maps.event.removeListener(_ready_listener);
      }
    });
  }
}
