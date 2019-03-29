import { NgModule, Injector, DoBootstrap } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import { ListboxComponent } from "./components/listbox/listbox.component";
import { BootstrapComponent } from "./components/bootstrap/bootstrap.component";
import { ComponentFactoryResolver } from "@angular/core";

@NgModule({
  imports: [BrowserModule],
  exports: [],
  declarations: [BootstrapComponent, ListboxComponent],
  entryComponents: [BootstrapComponent, ListboxComponent]
})
export class ListboxModule implements DoBootstrap {

  public constructor(
    private injector: Injector,
  ) {}

  ngDoBootstrap() {

    const bootrapInjector = Injector.create(
      [{
          provide: "ExtensionView",
          useFactory: (factoryResolver: ComponentFactoryResolver) => {
            return factoryResolver.resolveComponentFactory(ListboxComponent);
          },
          deps: [ComponentFactoryResolver]
      }],
      this.injector
    );

    const q2gBoostrap = createCustomElement(BootstrapComponent, {
      injector: bootrapInjector
    });
    customElements.define("q2g-ngx-extension", q2gBoostrap);
  }
}
