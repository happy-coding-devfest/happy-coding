import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[statusColor]'
})
export class StatusColor implements OnChanges{
    @Input() status!: number | null;
    coloration!: {background: string, color: string};

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if(!this.status) return;
        if(this.status === 1) this.coloration = {background: '#cafdeff3', color: '#03f3b1'};
        else if(this.status === 2) this.coloration = {background: '#fcc0bcf1', color: '#f32c1d'};
        else this.coloration = {background: '#dff5fff3', color: '#0093b7'};
        this.setColor(this.coloration);
    }

    setColor(donnees: {background: string, color: string}): void {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', donnees.background);
        this.renderer.setStyle(this.el.nativeElement, 'color', donnees.color);
    }
}