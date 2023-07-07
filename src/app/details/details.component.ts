import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {
  @Input() id: string;
}
