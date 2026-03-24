import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() page = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();
  private autoSub?: Subscription;

  public ngOnInit(): void {
    this.autoSub = interval(5000).subscribe(() => {
      this.autoNext();
    });
  }

  public next(): void {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
      this.resetInterval();
    }
  }

  public prev(): void {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
      this.resetInterval();
    }
  }

  public goTo(page: number): void {
    this.pageChange.emit(page);
    this.resetInterval();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private autoNext() {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    } else {
      this.pageChange.emit(1);
    }
  }

  private resetInterval() {
    this.autoSub?.unsubscribe();
    this.autoSub = interval(5000).subscribe(() => this.autoNext());
  }
}
