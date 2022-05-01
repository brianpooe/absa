import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Entry } from '@absa/shared/models';

@Component({
  selector: 'absa-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  @Input() isLoading!: boolean | null;
  @Input() entries!: Entry[] | null;
  @Input() error!: string | null;

  readonly IMAGE_PLACEHOLDER = 'assets/images/placeholder.png';
}
