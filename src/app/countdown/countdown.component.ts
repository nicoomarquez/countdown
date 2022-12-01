import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs/internal/operators/map';
@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
  time!: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  @Input() finishDateString: string = '';
  finishDate: Date = new Date();
  hasCountdownFinished: Boolean = false;
  isEngineer: Boolean = false;

  ngOnInit(): void {
    // Inicializamos el momento que falta hasta llegaral tiempo objetivo con valores en 0
    this.time = {
      days: 0, hours: 0, minutes: 0, seconds: 0
    };
    // Creamos la fecha a partir de la fecha en formato string AAAA-MM-dd HH:mm:ss
    this.finishDate = new Date(this.finishDateString);

    this.start().subscribe(_ => console.log("tik"));
  }

  updateTime() {

    const now = new Date();
    const diff = this.finishDate.getTime() - now.getTime();
    console.log(diff)
    if (diff > 0) {
      // Cálculos para sacar lo que resta hasta ese tiempo objetivo / final
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor(diff / (1000 * 60));
      const secs = Math.floor(diff / 1000);

      // La diferencia que se asignará para mostrarlo en la pantalla
      this.time.days = days;
      this.time.hours = hours - days * 24;
      this.time.minutes = mins - hours * 60;
      this.time.seconds = secs - mins * 60;
    }
    else{
      this.time.days = 0;
      this.time.hours = 0;
      this.time.minutes = 0;
      this.time.seconds = 0;
      this.hasCountdownFinished = true;
    }
  }

  // Ejecutamos la acción cada segundo, para obtener la diferencia entre el momento actual y el objetivo
  start() {
    return interval(1000).pipe(
      map((x: number) => {
        this.updateTime();
        return x;
      })
    );
  }
}
